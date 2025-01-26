BEGIN;

-- CreateEnum
CREATE TYPE "OnboardingStep" AS ENUM ('STEP_ONE', 'STEP_TWO', 'COMPLETED');

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "onboardingStep" "OnboardingStep";

COMMIT; 