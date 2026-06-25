import {
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  lastSeenAt: timestamp("lastSeenAt")
    .defaultNow()
    .$onUpdateFn(() => new Date())
    .notNull(),
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
  lastUpdated: timestamp("lastUpdated")
    .defaultNow()
    .$onUpdateFn(() => new Date())
    .notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type College = typeof colleges.$inferSelect;
export type InsertCollege = typeof colleges.$inferInsert;

export const comparisons = pgTable("comparisons", {
  id: serial("id").primaryKey(),
  anonymousId: uuid("anonymousId")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  collegeIds: text("collegeIds").notNull(),
  summary: text("summary"),
  comparisonData: text("comparisonData"),
  llmProvider: text("llmProvider"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt")
    .defaultNow()
    .$onUpdateFn(() => new Date())
    .notNull(),
});

export type Comparison = typeof comparisons.$inferSelect;
export type InsertComparison = typeof comparisons.$inferInsert;
