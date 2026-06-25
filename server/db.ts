import { desc, eq, inArray } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import {
  colleges,
  comparisons,
  InsertCollege,
  users,
} from "../drizzle/schema";
import { MAX_COMPARISON_HISTORY } from "./_core/constants";

let _db: ReturnType<typeof drizzle> | null = null;

/** Lazily connect so local tooling can run without DATABASE_URL set. */
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

/** Upsert (insert or refresh lastSeenAt) for an anonymous user. */
export async function upsertAnonymousUser(anonId: string) {
  const db = await getDb();
  if (!db) return undefined;
  try {
    await db
      .insert(users)
      .values({ id: anonId })
      .onConflictDoUpdate({
        target: users.id,
        set: { lastSeenAt: new Date() },
      });
    const rows = await db
      .select()
      .from(users)
      .where(eq(users.id, anonId))
      .limit(1);
    return rows[0];
  } catch (error) {
    console.error("[Database] Failed to upsert anonymous user:", error);
    return undefined;
  }
}

export async function getCollegeByName(name: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db
    .select()
    .from(colleges)
    .where(eq(colleges.name, name))
    .limit(1);
  return result.length > 0 ? result[0] : undefined;
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
    await db
      .insert(colleges)
      .values(college)
      .onConflictDoUpdate({
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

export async function getAnonymousComparisons(anonId: string) {
  const db = await getDb();
  if (!db) return [];
  return await db
    .select()
    .from(comparisons)
    .where(eq(comparisons.anonymousId, anonId))
    .orderBy(desc(comparisons.createdAt));
}

export async function createComparison(params: {
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
      const existing = await tx
        .select({ id: comparisons.id })
        .from(comparisons)
        .where(eq(comparisons.anonymousId, params.anonymousId))
        .orderBy(desc(comparisons.createdAt));

      const excess = existing.length - MAX_COMPARISON_HISTORY + 1;
      if (excess > 0) {
        const idsToDelete = existing.slice(-excess).map((row) => row.id);
        await tx
          .delete(comparisons)
          .where(inArray(comparisons.id, idsToDelete));
      }

      const [newRow] = await tx
        .insert(comparisons)
        .values({
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
