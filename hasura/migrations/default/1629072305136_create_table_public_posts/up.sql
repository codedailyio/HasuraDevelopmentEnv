CREATE TABLE "public"."posts" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "title" text NOT NULL, "body" text NOT NULL, "user_id" uuid NOT NULL, PRIMARY KEY ("id") );
CREATE EXTENSION IF NOT EXISTS pgcrypto;
