-- Add Resources category enum values (run in Supabase if not using payload:migrate)
ALTER TYPE "tnf"."enum_resources_category" ADD VALUE IF NOT EXISTS 'annual-performance-plan';
ALTER TYPE "tnf"."enum_resources_category" ADD VALUE IF NOT EXISTS 'tnf-reports-plans';
