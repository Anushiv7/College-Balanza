CREATE TABLE "colleges" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"placements" text,
	"location" varchar(255),
	"facultyReview" text,
	"fees" varchar(255),
	"roi" text,
	"industryValue" text,
	"brandValue" text,
	"collegeLife" text,
	"lastUpdated" timestamp DEFAULT now() NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "colleges_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "comparisons" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer,
	"anonymousId" text,
	"collegeIds" text NOT NULL,
	"summary" text,
	"comparisonData" text,
	"llmProvider" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"openId" varchar(64) NOT NULL,
	"name" text,
	"email" varchar(320),
	"loginMethod" varchar(64),
	"role" "role" DEFAULT 'user' NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"lastSignedIn" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_openId_unique" UNIQUE("openId")
);
--> statement-breakpoint
ALTER TABLE "comparisons" ADD CONSTRAINT "comparisons_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;