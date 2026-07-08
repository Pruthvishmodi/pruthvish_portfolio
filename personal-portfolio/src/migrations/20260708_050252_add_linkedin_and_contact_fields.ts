import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pers_port" ALTER COLUMN "hero_experience_years" SET DEFAULT '10+';
  ALTER TABLE "_pers_port_v" ALTER COLUMN "hero_experience_years" SET DEFAULT '10+';
  ALTER TABLE "pers_port" ADD COLUMN IF NOT EXISTS "hero_introduction" varchar DEFAULT 'Senior Full-Stack Developer & AI-First Engineer';
  ALTER TABLE "pers_port" ADD COLUMN IF NOT EXISTS "hero_location" varchar DEFAULT 'Ahmedabad, Gujarat, India';
  ALTER TABLE "pers_port" ADD COLUMN IF NOT EXISTS "hero_email" varchar DEFAULT 'your.email@example.com';
  ALTER TABLE "pers_port" ADD COLUMN IF NOT EXISTS "hero_phone" varchar DEFAULT '+91 99999 99999';
  ALTER TABLE "pers_port" ADD COLUMN IF NOT EXISTS "hero_linkedin_label" varchar DEFAULT 'LinkedIn';
  ALTER TABLE "pers_port" ADD COLUMN IF NOT EXISTS "hero_linkedin_link" varchar DEFAULT 'https://linkedin.com/in/username';
  ALTER TABLE "_pers_port_v" ADD COLUMN IF NOT EXISTS "hero_introduction" varchar DEFAULT 'Senior Full-Stack Developer & AI-First Engineer';
  ALTER TABLE "_pers_port_v" ADD COLUMN IF NOT EXISTS "hero_location" varchar DEFAULT 'Ahmedabad, Gujarat, India';
  ALTER TABLE "_pers_port_v" ADD COLUMN IF NOT EXISTS "hero_email" varchar DEFAULT 'your.email@example.com';
  ALTER TABLE "_pers_port_v" ADD COLUMN IF NOT EXISTS "hero_phone" varchar DEFAULT '+91 99999 99999';
  ALTER TABLE "_pers_port_v" ADD COLUMN IF NOT EXISTS "hero_linkedin_label" varchar DEFAULT 'LinkedIn';
  ALTER TABLE "_pers_port_v" ADD COLUMN IF NOT EXISTS "hero_linkedin_link" varchar DEFAULT 'https://linkedin.com/in/username';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pers_port" ALTER COLUMN "hero_experience_years" SET DEFAULT '9';
  ALTER TABLE "_pers_port_v" ALTER COLUMN "hero_experience_years" SET DEFAULT '9';
  ALTER TABLE "pers_port" DROP COLUMN "hero_introduction";
  ALTER TABLE "pers_port" DROP COLUMN "hero_location";
  ALTER TABLE "pers_port" DROP COLUMN "hero_email";
  ALTER TABLE "pers_port" DROP COLUMN "hero_phone";
  ALTER TABLE "pers_port" DROP COLUMN "hero_linkedin_label";
  ALTER TABLE "pers_port" DROP COLUMN "hero_linkedin_link";
  ALTER TABLE "_pers_port_v" DROP COLUMN "hero_introduction";
  ALTER TABLE "_pers_port_v" DROP COLUMN "hero_location";
  ALTER TABLE "_pers_port_v" DROP COLUMN "hero_email";
  ALTER TABLE "_pers_port_v" DROP COLUMN "hero_phone";
  ALTER TABLE "_pers_port_v" DROP COLUMN "hero_linkedin_label";
  ALTER TABLE "_pers_port_v" DROP COLUMN "hero_linkedin_link";`)
}
