import { eq, desc, inArray } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { InsertUser, users, colleges, comparisons, InsertCollege } from "../drizzle/schema";
import { ENV } from './_core/env';
import { MAX_COMPARISON_HISTORY } from "./_core/constants";

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      const client = postgres(process.env.DATABASE_URL);
      _db = drizzle(client);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    // PostgreSQL upsert: ON CONFLICT (openId) DO UPDATE
    await db.insert(users).values(values).onConflictDoUpdate({
      target: users.openId,
      set: updateSet as Partial<InsertUser>,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function getCollegeByName(name: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(colleges).where(eq(colleges.name, name)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getComparisonsByAnonymousId(anonId: string) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(comparisons).where(eq(comparisons.anonymousId, anonId));
}

export async function getAllColleges() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(colleges);
}

export async function upsertCollege(college: InsertCollege) {
  const db = await getDb();
  if (!db) return undefined;
  try {
    await db.insert(colleges).values(college).onConflictDoUpdate({
      target: colleges.name,
      set: {
        placements: college.placements,
        location: college.location,
        facultyReview: college.facultyReview,
        fees: college.fees,
        roi: college.roi,
        industryValue: college.industryValue,
        brandValue: college.brandValue,
        collegeLife: college.collegeLife,
        lastUpdated: new Date(),
      },
    });
    return await getCollegeByName(college.name);
  } catch (error) {
    console.error("[Database] Failed to upsert college:", error);
    throw error;
  }
}

export async function getUserComparisons(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(comparisons).where(eq(comparisons.userId, userId));
}

export async function createComparison(params: {
  userId?: number;
  anonymousId: string;
  collegeIds: number[];
  summary: string;
  comparisonData: string;
  llmProvider?: string;
}) {
  const db = await getDb();
  if (!db) return undefined;

  try {
    return await db.transaction(async (tx) => {
      // Use createdAt for chronological ordering (exists in schema)
      const existing = await tx
        .select({ id: comparisons.id })
        .from(comparisons)
        .where(eq(comparisons.anonymousId, params.anonymousId))
        .orderBy(desc(comparisons.createdAt));

      const excess = existing.length - MAX_COMPARISON_HISTORY + 1;
      if (excess > 0) {
        const idsToDelete = existing
          .slice(-excess)
          .map((row) => row.id);
        await tx
          .delete(comparisons)
          .where(inArray(comparisons.id, idsToDelete));
      }

      const [newRow] = await tx
        .insert(comparisons)
        .values({
          userId: params.userId,
          anonymousId: params.anonymousId,
          collegeIds: JSON.stringify(params.collegeIds),
          summary: params.summary,
          comparisonData: params.comparisonData,
          llmProvider: params.llmProvider ?? null,
        })
        .returning();

      return newRow;
    });
  } catch (error) {
    console.error("[Database] Failed to create comparison:", error);
    throw error;
  }
}

// TODO: add feature queries here as your schema grows.
