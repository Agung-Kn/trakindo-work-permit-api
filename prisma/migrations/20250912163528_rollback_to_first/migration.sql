/*
  Warnings:

  - You are about to drop the `form_submission_answers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `form_submission_items` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `form_submission_safety_equipments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `form_submissions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `forms` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `options` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `questions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `safety_equipments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sections` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `submission_logs` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'COMPLETED');

-- DropForeignKey
ALTER TABLE "form_submission_answers" DROP CONSTRAINT "form_submission_answers_questionId_fkey";

-- DropForeignKey
ALTER TABLE "form_submission_answers" DROP CONSTRAINT "form_submission_answers_submissionId_fkey";

-- DropForeignKey
ALTER TABLE "form_submission_items" DROP CONSTRAINT "form_submission_items_sectionId_fkey";

-- DropForeignKey
ALTER TABLE "form_submission_items" DROP CONSTRAINT "form_submission_items_submissionId_fkey";

-- DropForeignKey
ALTER TABLE "form_submission_safety_equipments" DROP CONSTRAINT "form_submission_safety_equipments_safetyEquipmentId_fkey";

-- DropForeignKey
ALTER TABLE "form_submission_safety_equipments" DROP CONSTRAINT "form_submission_safety_equipments_submissionId_fkey";

-- DropForeignKey
ALTER TABLE "form_submissions" DROP CONSTRAINT "form_submissions_formId_fkey";

-- DropForeignKey
ALTER TABLE "form_submissions" DROP CONSTRAINT "form_submissions_submittedById_fkey";

-- DropForeignKey
ALTER TABLE "options" DROP CONSTRAINT "options_questionId_fkey";

-- DropForeignKey
ALTER TABLE "questions" DROP CONSTRAINT "questions_sectionId_fkey";

-- DropForeignKey
ALTER TABLE "questions" DROP CONSTRAINT "questions_showIfOptionId_fkey";

-- DropForeignKey
ALTER TABLE "sections" DROP CONSTRAINT "sections_formId_fkey";

-- DropForeignKey
ALTER TABLE "submission_logs" DROP CONSTRAINT "submission_logs_submissionId_fkey";

-- DropTable
DROP TABLE "form_submission_answers";

-- DropTable
DROP TABLE "form_submission_items";

-- DropTable
DROP TABLE "form_submission_safety_equipments";

-- DropTable
DROP TABLE "form_submissions";

-- DropTable
DROP TABLE "forms";

-- DropTable
DROP TABLE "options";

-- DropTable
DROP TABLE "questions";

-- DropTable
DROP TABLE "safety_equipments";

-- DropTable
DROP TABLE "sections";

-- DropTable
DROP TABLE "submission_logs";

-- DropEnum
DROP TYPE "ItemType";

-- DropEnum
DROP TYPE "Priority";

-- DropEnum
DROP TYPE "QuestionType";

-- DropEnum
DROP TYPE "SafetyCategory";

-- DropEnum
DROP TYPE "SubmissionStatus";

-- CreateTable
CREATE TABLE "WorkPermit" (
    "id" SERIAL NOT NULL,
    "company" TEXT NOT NULL,
    "branch" TEXT NOT NULL,
    "pic" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" BIGINT,

    CONSTRAINT "WorkPermit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Equipment" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "qty" INTEGER NOT NULL,
    "workPermitId" INTEGER NOT NULL,

    CONSTRAINT "Equipment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Machine" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "qty" INTEGER NOT NULL,
    "workPermitId" INTEGER NOT NULL,

    CONSTRAINT "Machine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Material" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "qty" INTEGER NOT NULL,
    "workPermitId" INTEGER NOT NULL,

    CONSTRAINT "Material_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkPermitPPE" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "selected" BOOLEAN NOT NULL DEFAULT false,
    "workPermitId" INTEGER NOT NULL,

    CONSTRAINT "WorkPermitPPE_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkPermitEmergency" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "selected" BOOLEAN NOT NULL DEFAULT false,
    "workPermitId" INTEGER NOT NULL,

    CONSTRAINT "WorkPermitEmergency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChecklistAnswer" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "additional" TEXT,
    "workPermitId" INTEGER NOT NULL,

    CONSTRAINT "ChecklistAnswer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WorkPermit" ADD CONSTRAINT "WorkPermit_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Equipment" ADD CONSTRAINT "Equipment_workPermitId_fkey" FOREIGN KEY ("workPermitId") REFERENCES "WorkPermit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Machine" ADD CONSTRAINT "Machine_workPermitId_fkey" FOREIGN KEY ("workPermitId") REFERENCES "WorkPermit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Material" ADD CONSTRAINT "Material_workPermitId_fkey" FOREIGN KEY ("workPermitId") REFERENCES "WorkPermit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkPermitPPE" ADD CONSTRAINT "WorkPermitPPE_workPermitId_fkey" FOREIGN KEY ("workPermitId") REFERENCES "WorkPermit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkPermitEmergency" ADD CONSTRAINT "WorkPermitEmergency_workPermitId_fkey" FOREIGN KEY ("workPermitId") REFERENCES "WorkPermit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChecklistAnswer" ADD CONSTRAINT "ChecklistAnswer_workPermitId_fkey" FOREIGN KEY ("workPermitId") REFERENCES "WorkPermit"("id") ON DELETE CASCADE ON UPDATE CASCADE;
