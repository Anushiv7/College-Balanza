import { integer, pgEnum, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = pgTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: serial("id").primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: pgEnum("role", ["user", "admin"])("role").default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().$onUpdateFn(() => new Date()).notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export const colleges = pgTable("colleges", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull().unique(),
  placements: text("placements"),
  location: varchar("location", { length: 255 }),
  facultyReview: text("facultyReview"),
  fees: varchar("fees", { length: 255 }),
  roi: text("roi"),
  industryValue: text("industryValue"),
  brandValue: text("brandValue"),
  collegeLife: text("collegeLife"),
  lastUpdated: timestamp("lastUpdated").defaultNow().$onUpdateFn(() => new Date()).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type College = typeof colleges.$inferSelect;
export type InsertCollege = typeof colleges.$inferInsert;

export const comparisons = pgTable("comparisons", {
  id: serial("id").primaryKey(),
  userId: integer("userId").references(() => users.id, { onDelete: "cascade" }),
  anonymousId: text("anonymousId"),
  collegeIds: text("collegeIds").notNull(), // JSON array of college IDs
  summary: text("summary"), // LLM-generated comparison summary
  comparisonData: text("comparisonData"),
  llmProvider: text("llmProvider"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().$onUpdateFn(() => new Date()).notNull(),
});

export type Comparison = typeof comparisons.$inferSelect;
export type InsertComparison = typeof comparisons.$inferInsert;

// TODO: Add your tables here