/*
  Warnings:

  - You are about to drop the `AnswerOption` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Form` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FormSubmission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FormSubmissionAnswer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FormSubmissionApproval` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FormSubmissionLog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Option` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PermitResource` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Question` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SafetyEquipment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Section` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'COMPLETED');

-- DropForeignKey
ALTER TABLE "AnswerOption" DROP CONSTRAINT "AnswerOption_answerId_fkey";

-- DropForeignKey
ALTER TABLE "AnswerOption" DROP CONSTRAINT "AnswerOption_optionId_fkey";

-- DropForeignKey
ALTER TABLE "FormSubmission" DROP CONSTRAINT "FormSubmission_formId_fkey";

-- DropForeignKey
ALTER TABLE "FormSubmission" DROP CONSTRAINT "FormSubmission_submittedById_fkey";

-- DropForeignKey
ALTER TABLE "FormSubmissionAnswer" DROP CONSTRAINT "FormSubmissionAnswer_questionId_fkey";

-- DropForeignKey
ALTER TABLE "FormSubmissionAnswer" DROP CONSTRAINT "FormSubmissionAnswer_submissionId_fkey";

-- DropForeignKey
ALTER TABLE "FormSubmissionApproval" DROP CONSTRAINT "FormSubmissionApproval_submissionId_fkey";

-- DropForeignKey
ALTER TABLE "FormSubmissionLog" DROP CONSTRAINT "FormSubmissionLog_submissionId_fkey";

-- DropForeignKey
ALTER TABLE "Option" DROP CONSTRAINT "Option_questionId_fkey";

-- DropForeignKey
ALTER TABLE "PermitResource" DROP CONSTRAINT "PermitResource_submissionId_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_sectionId_fkey";

-- DropForeignKey
ALTER TABLE "Section" DROP CONSTRAINT "Section_formId_fkey";

-- DropTable
DROP TABLE "AnswerOption";

-- DropTable
DROP TABLE "Form";

-- DropTable
DROP TABLE "FormSubmission";

-- DropTable
DROP TABLE "FormSubmissionAnswer";

-- DropTable
DROP TABLE "FormSubmissionApproval";

-- DropTable
DROP TABLE "FormSubmissionLog";

-- DropTable
DROP TABLE "Option";

-- DropTable
DROP TABLE "PermitResource";

-- DropTable
DROP TABLE "Question";

-- DropTable
DROP TABLE "SafetyEquipment";

-- DropTable
DROP TABLE "Section";

-- DropTable
DROP TABLE "User";

-- DropEnum
DROP TYPE "Priority";

-- DropEnum
DROP TYPE "QuestionType";

-- DropEnum
DROP TYPE "ResourceType";

-- DropEnum
DROP TYPE "Role";

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
