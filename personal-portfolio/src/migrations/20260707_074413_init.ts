import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."pp_core_color" AS ENUM('primary', 'secondary', 'tertiary');
  CREATE TYPE "public"."pp_stat_color" AS ENUM('primary', 'secondary', 'tertiary');
  CREATE TYPE "public"."pp_card_color" AS ENUM('primary', 'secondary', 'tertiary');
  CREATE TYPE "public"."pp_timeline_color" AS ENUM('primary', 'secondary', 'tertiary');
  CREATE TYPE "public"."pp_testimonial_color" AS ENUM('primary', 'secondary', 'tertiary');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_portfolios_domain" AS ENUM('Health', 'SaaS', 'Fintech', 'Education', 'Ecommerce', 'AI', 'Real Estate', 'Other');
  CREATE TYPE "public"."enum_portfolios_tech_stack" AS ENUM('React', 'Next.js', 'Payload CMS', 'Node.js', 'AI', 'React Native', 'Flutter', 'TypeScript', 'TailwindCSS', 'PostgreSQL', 'AWS', 'Docker', 'Other');
  CREATE TYPE "public"."enum_portfolios_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__portfolios_v_version_domain" AS ENUM('Health', 'SaaS', 'Fintech', 'Education', 'Ecommerce', 'AI', 'Real Estate', 'Other');
  CREATE TYPE "public"."enum__portfolios_v_version_tech_stack" AS ENUM('React', 'Next.js', 'Payload CMS', 'Node.js', 'AI', 'React Native', 'Flutter', 'TypeScript', 'TailwindCSS', 'PostgreSQL', 'AWS', 'Docker', 'Other');
  CREATE TYPE "public"."enum__portfolios_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_payload_jobs_log_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE "public"."enum_payload_jobs_log_state" AS ENUM('failed', 'succeeded');
  CREATE TYPE "public"."enum_payload_jobs_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar,
  	"thumbnail_id" integer,
  	"duration" varchar,
  	"caption" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_square_url" varchar,
  	"sizes_square_width" numeric,
  	"sizes_square_height" numeric,
  	"sizes_square_mime_type" varchar,
  	"sizes_square_filesize" numeric,
  	"sizes_square_filename" varchar,
  	"sizes_small_url" varchar,
  	"sizes_small_width" numeric,
  	"sizes_small_height" numeric,
  	"sizes_small_mime_type" varchar,
  	"sizes_small_filesize" numeric,
  	"sizes_small_filename" varchar,
  	"sizes_medium_url" varchar,
  	"sizes_medium_width" numeric,
  	"sizes_medium_height" numeric,
  	"sizes_medium_mime_type" varchar,
  	"sizes_medium_filesize" numeric,
  	"sizes_medium_filename" varchar,
  	"sizes_large_url" varchar,
  	"sizes_large_width" numeric,
  	"sizes_large_height" numeric,
  	"sizes_large_mime_type" varchar,
  	"sizes_large_filesize" numeric,
  	"sizes_large_filename" varchar,
  	"sizes_xlarge_url" varchar,
  	"sizes_xlarge_width" numeric,
  	"sizes_xlarge_height" numeric,
  	"sizes_xlarge_mime_type" varchar,
  	"sizes_xlarge_filesize" numeric,
  	"sizes_xlarge_filename" varchar,
  	"sizes_og_url" varchar,
  	"sizes_og_width" numeric,
  	"sizes_og_height" numeric,
  	"sizes_og_mime_type" varchar,
  	"sizes_og_filesize" numeric,
  	"sizes_og_filename" varchar
  );
  
  CREATE TABLE "pers_port_marquee_skills" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"icon" varchar,
  	"proficiency" numeric DEFAULT 90
  );
  
  CREATE TABLE "pers_port_core_mastery" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Figma',
  	"subtitle" varchar DEFAULT 'Design System',
  	"icon" varchar DEFAULT 'brush',
  	"color" "pp_core_color" DEFAULT 'primary'
  );
  
  CREATE TABLE "pers_port_expertise_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"label" varchar,
  	"color" "pp_stat_color" DEFAULT 'primary'
  );
  
  CREATE TABLE "pers_port_expertise_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar DEFAULT 'High-converting landing pages and enterprise SaaS platforms designed for performance.',
  	"projects_count_text" varchar DEFAULT '76 PROJECTS',
  	"icon" varchar DEFAULT 'desktop_windows',
  	"color" "pp_card_color" DEFAULT 'primary'
  );
  
  CREATE TABLE "pers_port_work_experience_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"company" varchar,
  	"duration" varchar,
  	"role" varchar,
  	"description" varchar,
  	"color" "pp_timeline_color" DEFAULT 'primary'
  );
  
  CREATE TABLE "pp_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"avatar_id" integer,
  	"quote" varchar,
  	"name" varchar,
  	"role" varchar,
  	"color" "pp_testimonial_color" DEFAULT 'primary',
  	"is_featured" boolean DEFAULT false
  );
  
  CREATE TABLE "pers_port_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "pers_port" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"hero_badge_text" varchar DEFAULT 'AVAILABLE FOR PROJECTS',
  	"hero_title_pre_highlight" varchar DEFAULT 'Hey There, I’m',
  	"hero_title_highlight" varchar DEFAULT 'Binjan',
  	"hero_description" varchar DEFAULT 'I am a Lead UI/UX Designer based in Brisbane, passionate about crafting seamless digital experiences. With a decade of refining my craft, I bridge the gap between design and development using high-fidelity systems and pixel-perfect precision to help businesses grow effectively.',
  	"hero_experience_years" varchar DEFAULT '10+',
  	"hero_experience_label" varchar DEFAULT 'YEARS EXPERIENCE',
  	"hero_certification_title" varchar DEFAULT 'IDF CERTIFIED',
  	"hero_certification_label" varchar DEFAULT 'PROFATIONAL UI/UX',
  	"hero_say_hi_label" varchar DEFAULT 'Saying Hi',
  	"hero_say_hi_link" varchar DEFAULT '#contact',
  	"hero_download_cv_label" varchar DEFAULT 'Download CV',
  	"hero_download_cv_file_id" integer,
  	"hero_hero_image_id" integer,
  	"expertise_title" varchar DEFAULT 'Driving Business Growth Through Design',
  	"expertise_description" varchar DEFAULT 'I specialize in creating strategic digital solutions that don''t just look good, but solve complex problems and drive measurable business outcomes.',
  	"work_experience_title" varchar DEFAULT 'My Work Experience',
  	"latest_works_title" varchar DEFAULT 'My Latest Works',
  	"latest_works_subtitle" varchar DEFAULT 'Perfect solution for digital experience',
  	"latest_works_explore_more_label" varchar DEFAULT 'EXPLORE MORE WORKS',
  	"latest_works_explore_more_link" varchar DEFAULT '/portfolio',
  	"testimonials_section_title" varchar DEFAULT 'People talk about us',
  	"testimonials_section_subtitle" varchar DEFAULT 'I got a job that was in accordance with the salary and field of work. The process of submitting an application was quite cozy.',
  	"cta_title" varchar DEFAULT 'Let’s make something amazing together.',
  	"cta_pre_email_text" varchar DEFAULT 'Start by saying hi',
  	"cta_email" varchar DEFAULT 'banjan10@gmail.com',
  	"cta_address_title" varchar DEFAULT 'INFORMATION',
  	"cta_address" varchar DEFAULT '145 New York, FL 5467, USA',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_portfolio_web_projects" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"project_id" integer,
  	"custom_title" varchar,
  	"custom_description" varchar
  );
  
  CREATE TABLE "pages_blocks_portfolio_mobile_projects" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"project_id" integer,
  	"custom_title" varchar,
  	"custom_description" varchar
  );
  
  CREATE TABLE "pages_blocks_portfolio_ai_videos" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"project_id" integer,
  	"custom_title" varchar,
  	"custom_description" varchar
  );
  
  CREATE TABLE "pages_blocks_portfolio" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Our Portfolio',
  	"subtitle" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"published_at" timestamp(3) with time zone,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"portfolios_id" integer
  );
  
  CREATE TABLE "_pers_port_v_marquee_skills" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"icon" varchar,
  	"proficiency" numeric DEFAULT 90,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pers_port_v_core_mastery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Figma',
  	"subtitle" varchar DEFAULT 'Design System',
  	"icon" varchar DEFAULT 'brush',
  	"color" "pp_core_color" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pers_port_v_expertise_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"label" varchar,
  	"color" "pp_stat_color" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pers_port_v_expertise_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar DEFAULT 'High-converting landing pages and enterprise SaaS platforms designed for performance.',
  	"projects_count_text" varchar DEFAULT '76 PROJECTS',
  	"icon" varchar DEFAULT 'desktop_windows',
  	"color" "pp_card_color" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pers_port_v_work_experience_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"company" varchar,
  	"duration" varchar,
  	"role" varchar,
  	"description" varchar,
  	"color" "pp_timeline_color" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pp_testimonials_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"avatar_id" integer,
  	"quote" varchar,
  	"name" varchar,
  	"role" varchar,
  	"color" "pp_testimonial_color" DEFAULT 'primary',
  	"is_featured" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pers_port_v_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pers_port_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_badge_text" varchar DEFAULT 'AVAILABLE FOR PROJECTS',
  	"hero_title_pre_highlight" varchar DEFAULT 'Hey There, I’m',
  	"hero_title_highlight" varchar DEFAULT 'Binjan',
  	"hero_description" varchar DEFAULT 'I am a Lead UI/UX Designer based in Brisbane, passionate about crafting seamless digital experiences. With a decade of refining my craft, I bridge the gap between design and development using high-fidelity systems and pixel-perfect precision to help businesses grow effectively.',
  	"hero_experience_years" varchar DEFAULT '10+',
  	"hero_experience_label" varchar DEFAULT 'YEARS EXPERIENCE',
  	"hero_certification_title" varchar DEFAULT 'IDF CERTIFIED',
  	"hero_certification_label" varchar DEFAULT 'PROFATIONAL UI/UX',
  	"hero_say_hi_label" varchar DEFAULT 'Saying Hi',
  	"hero_say_hi_link" varchar DEFAULT '#contact',
  	"hero_download_cv_label" varchar DEFAULT 'Download CV',
  	"hero_download_cv_file_id" integer,
  	"hero_hero_image_id" integer,
  	"expertise_title" varchar DEFAULT 'Driving Business Growth Through Design',
  	"expertise_description" varchar DEFAULT 'I specialize in creating strategic digital solutions that don''t just look good, but solve complex problems and drive measurable business outcomes.',
  	"work_experience_title" varchar DEFAULT 'My Work Experience',
  	"latest_works_title" varchar DEFAULT 'My Latest Works',
  	"latest_works_subtitle" varchar DEFAULT 'Perfect solution for digital experience',
  	"latest_works_explore_more_label" varchar DEFAULT 'EXPLORE MORE WORKS',
  	"latest_works_explore_more_link" varchar DEFAULT '/portfolio',
  	"testimonials_section_title" varchar DEFAULT 'People talk about us',
  	"testimonials_section_subtitle" varchar DEFAULT 'I got a job that was in accordance with the salary and field of work. The process of submitting an application was quite cozy.',
  	"cta_title" varchar DEFAULT 'Let’s make something amazing together.',
  	"cta_pre_email_text" varchar DEFAULT 'Start by saying hi',
  	"cta_email" varchar DEFAULT 'banjan10@gmail.com',
  	"cta_address_title" varchar DEFAULT 'INFORMATION',
  	"cta_address" varchar DEFAULT '145 New York, FL 5467, USA',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_portfolio_web_projects" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"project_id" integer,
  	"custom_title" varchar,
  	"custom_description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_portfolio_mobile_projects" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"project_id" integer,
  	"custom_title" varchar,
  	"custom_description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_portfolio_ai_videos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"project_id" integer,
  	"custom_title" varchar,
  	"custom_description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_portfolio" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Our Portfolio',
  	"subtitle" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_pages_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"portfolios_id" integer
  );
  
  CREATE TABLE "portfolios_domain" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_portfolios_domain",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "portfolios_tech_stack" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_portfolios_tech_stack",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "portfolios_custom_tech_stack" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tech" varchar
  );
  
  CREATE TABLE "portfolios_screenshots" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar
  );
  
  CREATE TABLE "portfolios_key_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar
  );
  
  CREATE TABLE "portfolios_challenges" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"challenge" varchar
  );
  
  CREATE TABLE "portfolios_solutions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"solution" varchar
  );
  
  CREATE TABLE "portfolios_results" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"result" varchar
  );
  
  CREATE TABLE "portfolios" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"custom_domain" varchar,
  	"short_description" varchar,
  	"full_description" jsonb,
  	"live_project_url" varchar,
  	"android_project_url" varchar,
  	"ios_project_url" varchar,
  	"youtube_video_url" varchar,
  	"short_video_id" integer,
  	"video_thumbnail_id" integer,
  	"client_name" varchar,
  	"project_duration" varchar,
  	"team_size" varchar,
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"published_at" timestamp(3) with time zone,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_portfolios_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_portfolios_v_version_domain" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__portfolios_v_version_domain",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_portfolios_v_version_tech_stack" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__portfolios_v_version_tech_stack",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_portfolios_v_version_custom_tech_stack" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tech" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_portfolios_v_version_screenshots" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_portfolios_v_version_key_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"feature" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_portfolios_v_version_challenges" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"challenge" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_portfolios_v_version_solutions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"solution" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_portfolios_v_version_results" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"result" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_portfolios_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_custom_domain" varchar,
  	"version_short_description" varchar,
  	"version_full_description" jsonb,
  	"version_live_project_url" varchar,
  	"version_android_project_url" varchar,
  	"version_ios_project_url" varchar,
  	"version_youtube_video_url" varchar,
  	"version_short_video_id" integer,
  	"version_video_thumbnail_id" integer,
  	"version_client_name" varchar,
  	"version_project_duration" varchar,
  	"version_team_size" varchar,
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__portfolios_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_jobs_log" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"executed_at" timestamp(3) with time zone NOT NULL,
  	"completed_at" timestamp(3) with time zone NOT NULL,
  	"task_slug" "enum_payload_jobs_log_task_slug" NOT NULL,
  	"task_i_d" varchar NOT NULL,
  	"input" jsonb,
  	"output" jsonb,
  	"state" "enum_payload_jobs_log_state" NOT NULL,
  	"error" jsonb
  );
  
  CREATE TABLE "payload_jobs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"input" jsonb,
  	"completed_at" timestamp(3) with time zone,
  	"total_tried" numeric DEFAULT 0,
  	"has_error" boolean DEFAULT false,
  	"error" jsonb,
  	"task_slug" "enum_payload_jobs_task_slug",
  	"queue" varchar DEFAULT 'default',
  	"wait_until" timestamp(3) with time zone,
  	"processing" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"pages_id" integer,
  	"portfolios_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media" ADD CONSTRAINT "media_thumbnail_id_media_id_fk" FOREIGN KEY ("thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pers_port_marquee_skills" ADD CONSTRAINT "pers_port_marquee_skills_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pers_port"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pers_port_core_mastery" ADD CONSTRAINT "pers_port_core_mastery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pers_port"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pers_port_expertise_stats" ADD CONSTRAINT "pers_port_expertise_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pers_port"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pers_port_expertise_cards" ADD CONSTRAINT "pers_port_expertise_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pers_port"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pers_port_work_experience_timeline" ADD CONSTRAINT "pers_port_work_experience_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pers_port"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pp_testimonials" ADD CONSTRAINT "pp_testimonials_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pp_testimonials" ADD CONSTRAINT "pp_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pers_port"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pers_port_cta_links" ADD CONSTRAINT "pers_port_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pers_port"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pers_port" ADD CONSTRAINT "pers_port_hero_download_cv_file_id_media_id_fk" FOREIGN KEY ("hero_download_cv_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pers_port" ADD CONSTRAINT "pers_port_hero_hero_image_id_media_id_fk" FOREIGN KEY ("hero_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pers_port" ADD CONSTRAINT "pers_port_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_portfolio_web_projects" ADD CONSTRAINT "pages_blocks_portfolio_web_projects_project_id_portfolios_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."portfolios"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_portfolio_web_projects" ADD CONSTRAINT "pages_blocks_portfolio_web_projects_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_portfolio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_portfolio_mobile_projects" ADD CONSTRAINT "pages_blocks_portfolio_mobile_projects_project_id_portfolios_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."portfolios"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_portfolio_mobile_projects" ADD CONSTRAINT "pages_blocks_portfolio_mobile_projects_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_portfolio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_portfolio_ai_videos" ADD CONSTRAINT "pages_blocks_portfolio_ai_videos_project_id_portfolios_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."portfolios"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_portfolio_ai_videos" ADD CONSTRAINT "pages_blocks_portfolio_ai_videos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_portfolio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_portfolio" ADD CONSTRAINT "pages_blocks_portfolio_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_portfolios_fk" FOREIGN KEY ("portfolios_id") REFERENCES "public"."portfolios"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pers_port_v_marquee_skills" ADD CONSTRAINT "_pers_port_v_marquee_skills_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pers_port_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pers_port_v_core_mastery" ADD CONSTRAINT "_pers_port_v_core_mastery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pers_port_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pers_port_v_expertise_stats" ADD CONSTRAINT "_pers_port_v_expertise_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pers_port_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pers_port_v_expertise_cards" ADD CONSTRAINT "_pers_port_v_expertise_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pers_port_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pers_port_v_work_experience_timeline" ADD CONSTRAINT "_pers_port_v_work_experience_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pers_port_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pp_testimonials_v" ADD CONSTRAINT "_pp_testimonials_v_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pp_testimonials_v" ADD CONSTRAINT "_pp_testimonials_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pers_port_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pers_port_v_cta_links" ADD CONSTRAINT "_pers_port_v_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pers_port_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pers_port_v" ADD CONSTRAINT "_pers_port_v_hero_download_cv_file_id_media_id_fk" FOREIGN KEY ("hero_download_cv_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pers_port_v" ADD CONSTRAINT "_pers_port_v_hero_hero_image_id_media_id_fk" FOREIGN KEY ("hero_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pers_port_v" ADD CONSTRAINT "_pers_port_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_portfolio_web_projects" ADD CONSTRAINT "_pages_v_blocks_portfolio_web_projects_project_id_portfolios_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."portfolios"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_portfolio_web_projects" ADD CONSTRAINT "_pages_v_blocks_portfolio_web_projects_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_portfolio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_portfolio_mobile_projects" ADD CONSTRAINT "_pages_v_blocks_portfolio_mobile_projects_project_id_portfolios_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."portfolios"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_portfolio_mobile_projects" ADD CONSTRAINT "_pages_v_blocks_portfolio_mobile_projects_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_portfolio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_portfolio_ai_videos" ADD CONSTRAINT "_pages_v_blocks_portfolio_ai_videos_project_id_portfolios_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."portfolios"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_portfolio_ai_videos" ADD CONSTRAINT "_pages_v_blocks_portfolio_ai_videos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_portfolio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_portfolio" ADD CONSTRAINT "_pages_v_blocks_portfolio_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_portfolios_fk" FOREIGN KEY ("portfolios_id") REFERENCES "public"."portfolios"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "portfolios_domain" ADD CONSTRAINT "portfolios_domain_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."portfolios"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "portfolios_tech_stack" ADD CONSTRAINT "portfolios_tech_stack_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."portfolios"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "portfolios_custom_tech_stack" ADD CONSTRAINT "portfolios_custom_tech_stack_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."portfolios"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "portfolios_screenshots" ADD CONSTRAINT "portfolios_screenshots_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "portfolios_screenshots" ADD CONSTRAINT "portfolios_screenshots_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."portfolios"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "portfolios_key_features" ADD CONSTRAINT "portfolios_key_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."portfolios"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "portfolios_challenges" ADD CONSTRAINT "portfolios_challenges_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."portfolios"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "portfolios_solutions" ADD CONSTRAINT "portfolios_solutions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."portfolios"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "portfolios_results" ADD CONSTRAINT "portfolios_results_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."portfolios"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "portfolios" ADD CONSTRAINT "portfolios_short_video_id_media_id_fk" FOREIGN KEY ("short_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "portfolios" ADD CONSTRAINT "portfolios_video_thumbnail_id_media_id_fk" FOREIGN KEY ("video_thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "portfolios" ADD CONSTRAINT "portfolios_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_portfolios_v_version_domain" ADD CONSTRAINT "_portfolios_v_version_domain_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_portfolios_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_portfolios_v_version_tech_stack" ADD CONSTRAINT "_portfolios_v_version_tech_stack_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_portfolios_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_portfolios_v_version_custom_tech_stack" ADD CONSTRAINT "_portfolios_v_version_custom_tech_stack_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_portfolios_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_portfolios_v_version_screenshots" ADD CONSTRAINT "_portfolios_v_version_screenshots_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_portfolios_v_version_screenshots" ADD CONSTRAINT "_portfolios_v_version_screenshots_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_portfolios_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_portfolios_v_version_key_features" ADD CONSTRAINT "_portfolios_v_version_key_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_portfolios_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_portfolios_v_version_challenges" ADD CONSTRAINT "_portfolios_v_version_challenges_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_portfolios_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_portfolios_v_version_solutions" ADD CONSTRAINT "_portfolios_v_version_solutions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_portfolios_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_portfolios_v_version_results" ADD CONSTRAINT "_portfolios_v_version_results_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_portfolios_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_portfolios_v" ADD CONSTRAINT "_portfolios_v_parent_id_portfolios_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."portfolios"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_portfolios_v" ADD CONSTRAINT "_portfolios_v_version_short_video_id_media_id_fk" FOREIGN KEY ("version_short_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_portfolios_v" ADD CONSTRAINT "_portfolios_v_version_video_thumbnail_id_media_id_fk" FOREIGN KEY ("version_video_thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_portfolios_v" ADD CONSTRAINT "_portfolios_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_jobs_log" ADD CONSTRAINT "payload_jobs_log_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."payload_jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_portfolios_fk" FOREIGN KEY ("portfolios_id") REFERENCES "public"."portfolios"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_thumbnail_idx" ON "media" USING btree ("thumbnail_id");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_square_sizes_square_filename_idx" ON "media" USING btree ("sizes_square_filename");
  CREATE INDEX "media_sizes_small_sizes_small_filename_idx" ON "media" USING btree ("sizes_small_filename");
  CREATE INDEX "media_sizes_medium_sizes_medium_filename_idx" ON "media" USING btree ("sizes_medium_filename");
  CREATE INDEX "media_sizes_large_sizes_large_filename_idx" ON "media" USING btree ("sizes_large_filename");
  CREATE INDEX "media_sizes_xlarge_sizes_xlarge_filename_idx" ON "media" USING btree ("sizes_xlarge_filename");
  CREATE INDEX "media_sizes_og_sizes_og_filename_idx" ON "media" USING btree ("sizes_og_filename");
  CREATE INDEX "pers_port_marquee_skills_order_idx" ON "pers_port_marquee_skills" USING btree ("_order");
  CREATE INDEX "pers_port_marquee_skills_parent_id_idx" ON "pers_port_marquee_skills" USING btree ("_parent_id");
  CREATE INDEX "pers_port_core_mastery_order_idx" ON "pers_port_core_mastery" USING btree ("_order");
  CREATE INDEX "pers_port_core_mastery_parent_id_idx" ON "pers_port_core_mastery" USING btree ("_parent_id");
  CREATE INDEX "pers_port_expertise_stats_order_idx" ON "pers_port_expertise_stats" USING btree ("_order");
  CREATE INDEX "pers_port_expertise_stats_parent_id_idx" ON "pers_port_expertise_stats" USING btree ("_parent_id");
  CREATE INDEX "pers_port_expertise_cards_order_idx" ON "pers_port_expertise_cards" USING btree ("_order");
  CREATE INDEX "pers_port_expertise_cards_parent_id_idx" ON "pers_port_expertise_cards" USING btree ("_parent_id");
  CREATE INDEX "pers_port_work_experience_timeline_order_idx" ON "pers_port_work_experience_timeline" USING btree ("_order");
  CREATE INDEX "pers_port_work_experience_timeline_parent_id_idx" ON "pers_port_work_experience_timeline" USING btree ("_parent_id");
  CREATE INDEX "pp_testimonials_order_idx" ON "pp_testimonials" USING btree ("_order");
  CREATE INDEX "pp_testimonials_parent_id_idx" ON "pp_testimonials" USING btree ("_parent_id");
  CREATE INDEX "pp_testimonials_avatar_idx" ON "pp_testimonials" USING btree ("avatar_id");
  CREATE INDEX "pers_port_cta_links_order_idx" ON "pers_port_cta_links" USING btree ("_order");
  CREATE INDEX "pers_port_cta_links_parent_id_idx" ON "pers_port_cta_links" USING btree ("_parent_id");
  CREATE INDEX "pers_port_order_idx" ON "pers_port" USING btree ("_order");
  CREATE INDEX "pers_port_parent_id_idx" ON "pers_port" USING btree ("_parent_id");
  CREATE INDEX "pers_port_path_idx" ON "pers_port" USING btree ("_path");
  CREATE INDEX "pers_port_hero_hero_download_cv_file_idx" ON "pers_port" USING btree ("hero_download_cv_file_id");
  CREATE INDEX "pers_port_hero_hero_hero_image_idx" ON "pers_port" USING btree ("hero_hero_image_id");
  CREATE INDEX "pages_blocks_portfolio_web_projects_order_idx" ON "pages_blocks_portfolio_web_projects" USING btree ("_order");
  CREATE INDEX "pages_blocks_portfolio_web_projects_parent_id_idx" ON "pages_blocks_portfolio_web_projects" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_portfolio_web_projects_project_idx" ON "pages_blocks_portfolio_web_projects" USING btree ("project_id");
  CREATE INDEX "pages_blocks_portfolio_mobile_projects_order_idx" ON "pages_blocks_portfolio_mobile_projects" USING btree ("_order");
  CREATE INDEX "pages_blocks_portfolio_mobile_projects_parent_id_idx" ON "pages_blocks_portfolio_mobile_projects" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_portfolio_mobile_projects_project_idx" ON "pages_blocks_portfolio_mobile_projects" USING btree ("project_id");
  CREATE INDEX "pages_blocks_portfolio_ai_videos_order_idx" ON "pages_blocks_portfolio_ai_videos" USING btree ("_order");
  CREATE INDEX "pages_blocks_portfolio_ai_videos_parent_id_idx" ON "pages_blocks_portfolio_ai_videos" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_portfolio_ai_videos_project_idx" ON "pages_blocks_portfolio_ai_videos" USING btree ("project_id");
  CREATE INDEX "pages_blocks_portfolio_order_idx" ON "pages_blocks_portfolio" USING btree ("_order");
  CREATE INDEX "pages_blocks_portfolio_parent_id_idx" ON "pages_blocks_portfolio" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_portfolio_path_idx" ON "pages_blocks_portfolio" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_portfolios_id_idx" ON "pages_rels" USING btree ("portfolios_id");
  CREATE INDEX "_pers_port_v_marquee_skills_order_idx" ON "_pers_port_v_marquee_skills" USING btree ("_order");
  CREATE INDEX "_pers_port_v_marquee_skills_parent_id_idx" ON "_pers_port_v_marquee_skills" USING btree ("_parent_id");
  CREATE INDEX "_pers_port_v_core_mastery_order_idx" ON "_pers_port_v_core_mastery" USING btree ("_order");
  CREATE INDEX "_pers_port_v_core_mastery_parent_id_idx" ON "_pers_port_v_core_mastery" USING btree ("_parent_id");
  CREATE INDEX "_pers_port_v_expertise_stats_order_idx" ON "_pers_port_v_expertise_stats" USING btree ("_order");
  CREATE INDEX "_pers_port_v_expertise_stats_parent_id_idx" ON "_pers_port_v_expertise_stats" USING btree ("_parent_id");
  CREATE INDEX "_pers_port_v_expertise_cards_order_idx" ON "_pers_port_v_expertise_cards" USING btree ("_order");
  CREATE INDEX "_pers_port_v_expertise_cards_parent_id_idx" ON "_pers_port_v_expertise_cards" USING btree ("_parent_id");
  CREATE INDEX "_pers_port_v_work_experience_timeline_order_idx" ON "_pers_port_v_work_experience_timeline" USING btree ("_order");
  CREATE INDEX "_pers_port_v_work_experience_timeline_parent_id_idx" ON "_pers_port_v_work_experience_timeline" USING btree ("_parent_id");
  CREATE INDEX "_pp_testimonials_v_order_idx" ON "_pp_testimonials_v" USING btree ("_order");
  CREATE INDEX "_pp_testimonials_v_parent_id_idx" ON "_pp_testimonials_v" USING btree ("_parent_id");
  CREATE INDEX "_pp_testimonials_v_avatar_idx" ON "_pp_testimonials_v" USING btree ("avatar_id");
  CREATE INDEX "_pers_port_v_cta_links_order_idx" ON "_pers_port_v_cta_links" USING btree ("_order");
  CREATE INDEX "_pers_port_v_cta_links_parent_id_idx" ON "_pers_port_v_cta_links" USING btree ("_parent_id");
  CREATE INDEX "_pers_port_v_order_idx" ON "_pers_port_v" USING btree ("_order");
  CREATE INDEX "_pers_port_v_parent_id_idx" ON "_pers_port_v" USING btree ("_parent_id");
  CREATE INDEX "_pers_port_v_path_idx" ON "_pers_port_v" USING btree ("_path");
  CREATE INDEX "_pers_port_v_hero_hero_download_cv_file_idx" ON "_pers_port_v" USING btree ("hero_download_cv_file_id");
  CREATE INDEX "_pers_port_v_hero_hero_hero_image_idx" ON "_pers_port_v" USING btree ("hero_hero_image_id");
  CREATE INDEX "_pages_v_blocks_portfolio_web_projects_order_idx" ON "_pages_v_blocks_portfolio_web_projects" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_portfolio_web_projects_parent_id_idx" ON "_pages_v_blocks_portfolio_web_projects" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_portfolio_web_projects_project_idx" ON "_pages_v_blocks_portfolio_web_projects" USING btree ("project_id");
  CREATE INDEX "_pages_v_blocks_portfolio_mobile_projects_order_idx" ON "_pages_v_blocks_portfolio_mobile_projects" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_portfolio_mobile_projects_parent_id_idx" ON "_pages_v_blocks_portfolio_mobile_projects" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_portfolio_mobile_projects_project_idx" ON "_pages_v_blocks_portfolio_mobile_projects" USING btree ("project_id");
  CREATE INDEX "_pages_v_blocks_portfolio_ai_videos_order_idx" ON "_pages_v_blocks_portfolio_ai_videos" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_portfolio_ai_videos_parent_id_idx" ON "_pages_v_blocks_portfolio_ai_videos" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_portfolio_ai_videos_project_idx" ON "_pages_v_blocks_portfolio_ai_videos" USING btree ("project_id");
  CREATE INDEX "_pages_v_blocks_portfolio_order_idx" ON "_pages_v_blocks_portfolio" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_portfolio_parent_id_idx" ON "_pages_v_blocks_portfolio" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_portfolio_path_idx" ON "_pages_v_blocks_portfolio" USING btree ("_path");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX "_pages_v_autosave_idx" ON "_pages_v" USING btree ("autosave");
  CREATE INDEX "_pages_v_rels_order_idx" ON "_pages_v_rels" USING btree ("order");
  CREATE INDEX "_pages_v_rels_parent_idx" ON "_pages_v_rels" USING btree ("parent_id");
  CREATE INDEX "_pages_v_rels_path_idx" ON "_pages_v_rels" USING btree ("path");
  CREATE INDEX "_pages_v_rels_portfolios_id_idx" ON "_pages_v_rels" USING btree ("portfolios_id");
  CREATE INDEX "portfolios_domain_order_idx" ON "portfolios_domain" USING btree ("order");
  CREATE INDEX "portfolios_domain_parent_idx" ON "portfolios_domain" USING btree ("parent_id");
  CREATE INDEX "portfolios_tech_stack_order_idx" ON "portfolios_tech_stack" USING btree ("order");
  CREATE INDEX "portfolios_tech_stack_parent_idx" ON "portfolios_tech_stack" USING btree ("parent_id");
  CREATE INDEX "portfolios_custom_tech_stack_order_idx" ON "portfolios_custom_tech_stack" USING btree ("_order");
  CREATE INDEX "portfolios_custom_tech_stack_parent_id_idx" ON "portfolios_custom_tech_stack" USING btree ("_parent_id");
  CREATE INDEX "portfolios_screenshots_order_idx" ON "portfolios_screenshots" USING btree ("_order");
  CREATE INDEX "portfolios_screenshots_parent_id_idx" ON "portfolios_screenshots" USING btree ("_parent_id");
  CREATE INDEX "portfolios_screenshots_image_idx" ON "portfolios_screenshots" USING btree ("image_id");
  CREATE INDEX "portfolios_key_features_order_idx" ON "portfolios_key_features" USING btree ("_order");
  CREATE INDEX "portfolios_key_features_parent_id_idx" ON "portfolios_key_features" USING btree ("_parent_id");
  CREATE INDEX "portfolios_challenges_order_idx" ON "portfolios_challenges" USING btree ("_order");
  CREATE INDEX "portfolios_challenges_parent_id_idx" ON "portfolios_challenges" USING btree ("_parent_id");
  CREATE INDEX "portfolios_solutions_order_idx" ON "portfolios_solutions" USING btree ("_order");
  CREATE INDEX "portfolios_solutions_parent_id_idx" ON "portfolios_solutions" USING btree ("_parent_id");
  CREATE INDEX "portfolios_results_order_idx" ON "portfolios_results" USING btree ("_order");
  CREATE INDEX "portfolios_results_parent_id_idx" ON "portfolios_results" USING btree ("_parent_id");
  CREATE INDEX "portfolios_short_video_idx" ON "portfolios" USING btree ("short_video_id");
  CREATE INDEX "portfolios_video_thumbnail_idx" ON "portfolios" USING btree ("video_thumbnail_id");
  CREATE INDEX "portfolios_meta_meta_image_idx" ON "portfolios" USING btree ("meta_image_id");
  CREATE UNIQUE INDEX "portfolios_slug_idx" ON "portfolios" USING btree ("slug");
  CREATE INDEX "portfolios_updated_at_idx" ON "portfolios" USING btree ("updated_at");
  CREATE INDEX "portfolios_created_at_idx" ON "portfolios" USING btree ("created_at");
  CREATE INDEX "portfolios__status_idx" ON "portfolios" USING btree ("_status");
  CREATE INDEX "_portfolios_v_version_domain_order_idx" ON "_portfolios_v_version_domain" USING btree ("order");
  CREATE INDEX "_portfolios_v_version_domain_parent_idx" ON "_portfolios_v_version_domain" USING btree ("parent_id");
  CREATE INDEX "_portfolios_v_version_tech_stack_order_idx" ON "_portfolios_v_version_tech_stack" USING btree ("order");
  CREATE INDEX "_portfolios_v_version_tech_stack_parent_idx" ON "_portfolios_v_version_tech_stack" USING btree ("parent_id");
  CREATE INDEX "_portfolios_v_version_custom_tech_stack_order_idx" ON "_portfolios_v_version_custom_tech_stack" USING btree ("_order");
  CREATE INDEX "_portfolios_v_version_custom_tech_stack_parent_id_idx" ON "_portfolios_v_version_custom_tech_stack" USING btree ("_parent_id");
  CREATE INDEX "_portfolios_v_version_screenshots_order_idx" ON "_portfolios_v_version_screenshots" USING btree ("_order");
  CREATE INDEX "_portfolios_v_version_screenshots_parent_id_idx" ON "_portfolios_v_version_screenshots" USING btree ("_parent_id");
  CREATE INDEX "_portfolios_v_version_screenshots_image_idx" ON "_portfolios_v_version_screenshots" USING btree ("image_id");
  CREATE INDEX "_portfolios_v_version_key_features_order_idx" ON "_portfolios_v_version_key_features" USING btree ("_order");
  CREATE INDEX "_portfolios_v_version_key_features_parent_id_idx" ON "_portfolios_v_version_key_features" USING btree ("_parent_id");
  CREATE INDEX "_portfolios_v_version_challenges_order_idx" ON "_portfolios_v_version_challenges" USING btree ("_order");
  CREATE INDEX "_portfolios_v_version_challenges_parent_id_idx" ON "_portfolios_v_version_challenges" USING btree ("_parent_id");
  CREATE INDEX "_portfolios_v_version_solutions_order_idx" ON "_portfolios_v_version_solutions" USING btree ("_order");
  CREATE INDEX "_portfolios_v_version_solutions_parent_id_idx" ON "_portfolios_v_version_solutions" USING btree ("_parent_id");
  CREATE INDEX "_portfolios_v_version_results_order_idx" ON "_portfolios_v_version_results" USING btree ("_order");
  CREATE INDEX "_portfolios_v_version_results_parent_id_idx" ON "_portfolios_v_version_results" USING btree ("_parent_id");
  CREATE INDEX "_portfolios_v_parent_idx" ON "_portfolios_v" USING btree ("parent_id");
  CREATE INDEX "_portfolios_v_version_version_short_video_idx" ON "_portfolios_v" USING btree ("version_short_video_id");
  CREATE INDEX "_portfolios_v_version_version_video_thumbnail_idx" ON "_portfolios_v" USING btree ("version_video_thumbnail_id");
  CREATE INDEX "_portfolios_v_version_meta_version_meta_image_idx" ON "_portfolios_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_portfolios_v_version_version_slug_idx" ON "_portfolios_v" USING btree ("version_slug");
  CREATE INDEX "_portfolios_v_version_version_updated_at_idx" ON "_portfolios_v" USING btree ("version_updated_at");
  CREATE INDEX "_portfolios_v_version_version_created_at_idx" ON "_portfolios_v" USING btree ("version_created_at");
  CREATE INDEX "_portfolios_v_version_version__status_idx" ON "_portfolios_v" USING btree ("version__status");
  CREATE INDEX "_portfolios_v_created_at_idx" ON "_portfolios_v" USING btree ("created_at");
  CREATE INDEX "_portfolios_v_updated_at_idx" ON "_portfolios_v" USING btree ("updated_at");
  CREATE INDEX "_portfolios_v_latest_idx" ON "_portfolios_v" USING btree ("latest");
  CREATE INDEX "_portfolios_v_autosave_idx" ON "_portfolios_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_jobs_log_order_idx" ON "payload_jobs_log" USING btree ("_order");
  CREATE INDEX "payload_jobs_log_parent_id_idx" ON "payload_jobs_log" USING btree ("_parent_id");
  CREATE INDEX "payload_jobs_completed_at_idx" ON "payload_jobs" USING btree ("completed_at");
  CREATE INDEX "payload_jobs_total_tried_idx" ON "payload_jobs" USING btree ("total_tried");
  CREATE INDEX "payload_jobs_has_error_idx" ON "payload_jobs" USING btree ("has_error");
  CREATE INDEX "payload_jobs_task_slug_idx" ON "payload_jobs" USING btree ("task_slug");
  CREATE INDEX "payload_jobs_queue_idx" ON "payload_jobs" USING btree ("queue");
  CREATE INDEX "payload_jobs_wait_until_idx" ON "payload_jobs" USING btree ("wait_until");
  CREATE INDEX "payload_jobs_processing_idx" ON "payload_jobs" USING btree ("processing");
  CREATE INDEX "payload_jobs_updated_at_idx" ON "payload_jobs" USING btree ("updated_at");
  CREATE INDEX "payload_jobs_created_at_idx" ON "payload_jobs" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_portfolios_id_idx" ON "payload_locked_documents_rels" USING btree ("portfolios_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "pers_port_marquee_skills" CASCADE;
  DROP TABLE "pers_port_core_mastery" CASCADE;
  DROP TABLE "pers_port_expertise_stats" CASCADE;
  DROP TABLE "pers_port_expertise_cards" CASCADE;
  DROP TABLE "pers_port_work_experience_timeline" CASCADE;
  DROP TABLE "pp_testimonials" CASCADE;
  DROP TABLE "pers_port_cta_links" CASCADE;
  DROP TABLE "pers_port" CASCADE;
  DROP TABLE "pages_blocks_portfolio_web_projects" CASCADE;
  DROP TABLE "pages_blocks_portfolio_mobile_projects" CASCADE;
  DROP TABLE "pages_blocks_portfolio_ai_videos" CASCADE;
  DROP TABLE "pages_blocks_portfolio" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "_pers_port_v_marquee_skills" CASCADE;
  DROP TABLE "_pers_port_v_core_mastery" CASCADE;
  DROP TABLE "_pers_port_v_expertise_stats" CASCADE;
  DROP TABLE "_pers_port_v_expertise_cards" CASCADE;
  DROP TABLE "_pers_port_v_work_experience_timeline" CASCADE;
  DROP TABLE "_pp_testimonials_v" CASCADE;
  DROP TABLE "_pers_port_v_cta_links" CASCADE;
  DROP TABLE "_pers_port_v" CASCADE;
  DROP TABLE "_pages_v_blocks_portfolio_web_projects" CASCADE;
  DROP TABLE "_pages_v_blocks_portfolio_mobile_projects" CASCADE;
  DROP TABLE "_pages_v_blocks_portfolio_ai_videos" CASCADE;
  DROP TABLE "_pages_v_blocks_portfolio" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "_pages_v_rels" CASCADE;
  DROP TABLE "portfolios_domain" CASCADE;
  DROP TABLE "portfolios_tech_stack" CASCADE;
  DROP TABLE "portfolios_custom_tech_stack" CASCADE;
  DROP TABLE "portfolios_screenshots" CASCADE;
  DROP TABLE "portfolios_key_features" CASCADE;
  DROP TABLE "portfolios_challenges" CASCADE;
  DROP TABLE "portfolios_solutions" CASCADE;
  DROP TABLE "portfolios_results" CASCADE;
  DROP TABLE "portfolios" CASCADE;
  DROP TABLE "_portfolios_v_version_domain" CASCADE;
  DROP TABLE "_portfolios_v_version_tech_stack" CASCADE;
  DROP TABLE "_portfolios_v_version_custom_tech_stack" CASCADE;
  DROP TABLE "_portfolios_v_version_screenshots" CASCADE;
  DROP TABLE "_portfolios_v_version_key_features" CASCADE;
  DROP TABLE "_portfolios_v_version_challenges" CASCADE;
  DROP TABLE "_portfolios_v_version_solutions" CASCADE;
  DROP TABLE "_portfolios_v_version_results" CASCADE;
  DROP TABLE "_portfolios_v" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_jobs_log" CASCADE;
  DROP TABLE "payload_jobs" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TYPE "public"."pp_core_color";
  DROP TYPE "public"."pp_stat_color";
  DROP TYPE "public"."pp_card_color";
  DROP TYPE "public"."pp_timeline_color";
  DROP TYPE "public"."pp_testimonial_color";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum_portfolios_domain";
  DROP TYPE "public"."enum_portfolios_tech_stack";
  DROP TYPE "public"."enum_portfolios_status";
  DROP TYPE "public"."enum__portfolios_v_version_domain";
  DROP TYPE "public"."enum__portfolios_v_version_tech_stack";
  DROP TYPE "public"."enum__portfolios_v_version_status";
  DROP TYPE "public"."enum_payload_jobs_log_task_slug";
  DROP TYPE "public"."enum_payload_jobs_log_state";
  DROP TYPE "public"."enum_payload_jobs_task_slug";`)
}
