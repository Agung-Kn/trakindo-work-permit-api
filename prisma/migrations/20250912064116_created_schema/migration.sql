-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'JRO', 'EMPLOYEE', 'VENDOR');

-- CreateEnum
CREATE TYPE "QuestionType" AS ENUM ('Option', 'Number', 'Paragraph', 'Text', 'Date', 'Signature', 'YesNoNA', 'Checkbox', 'CheckboxFromMaster', 'File');

-- CreateEnum
CREATE TYPE "SafetyCategory" AS ENUM ('APD', 'Emergency');

-- CreateEnum
CREATE TYPE "ResourceType" AS ENUM ('Equipment', 'Machine', 'Material');

-- CreateEnum
CREATE TYPE "SubmissionStatus" AS ENUM ('Pending', 'InReview', 'Approved', 'Rejected');

-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('Normal', 'High');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Form" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "slug" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Form_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Section" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "index_number" INTEGER NOT NULL,
    "formId" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Section_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" BIGSERIAL NOT NULL,
    "index_number" INTEGER NOT NULL,
    "label" VARCHAR(255) NOT NULL,
    "type" "QuestionType" NOT NULL,
    "sectionId" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Option" (
    "id" BIGSERIAL NOT NULL,
    "value" VARCHAR(100) NOT NULL,
    "questionId" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Option_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FormSubmission" (
    "id" BIGSERIAL NOT NULL,
    "formId" BIGINT NOT NULL,
    "submittedById" TEXT NOT NULL,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "SubmissionStatus" NOT NULL DEFAULT 'Pending',
    "priority" "Priority" NOT NULL DEFAULT 'Normal',
    "workDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FormSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FormSubmissionAnswer" (
    "id" BIGSERIAL NOT NULL,
    "submissionId" BIGINT NOT NULL,
    "questionId" BIGINT NOT NULL,
    "value" TEXT,
    "fileUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FormSubmissionAnswer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnswerOption" (
    "id" BIGSERIAL NOT NULL,
    "answerId" BIGINT NOT NULL,
    "optionId" BIGINT NOT NULL,

    CONSTRAINT "AnswerOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PermitResource" (
    "id" BIGSERIAL NOT NULL,
    "submissionId" BIGINT NOT NULL,
    "type" "ResourceType" NOT NULL,
    "name" TEXT NOT NULL,
    "qty" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PermitResource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SafetyEquipment" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "category" "SafetyCategory" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SafetyEquipment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FormSubmissionApproval" (
    "id" BIGSERIAL NOT NULL,
    "submissionId" BIGINT NOT NULL,
    "role" "Role" NOT NULL,
    "approvedBy" TEXT NOT NULL,
    "approvedAt" TIMESTAMP(3) NOT NULL,
    "status" "SubmissionStatus" NOT NULL,

    CONSTRAINT "FormSubmissionApproval_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FormSubmissionLog" (
    "id" BIGSERIAL NOT NULL,
    "submissionId" BIGINT NOT NULL,
    "action" VARCHAR(100) NOT NULL,
    "actor" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FormSubmissionLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Form_slug_key" ON "Form"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "SafetyEquipment_name_key" ON "SafetyEquipment"("name");

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Option" ADD CONSTRAINT "Option_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormSubmission" ADD CONSTRAINT "FormSubmission_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormSubmission" ADD CONSTRAINT "FormSubmission_submittedById_fkey" FOREIGN KEY ("submittedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormSubmissionAnswer" ADD CONSTRAINT "FormSubmissionAnswer_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "FormSubmission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormSubmissionAnswer" ADD CONSTRAINT "FormSubmissionAnswer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnswerOption" ADD CONSTRAINT "AnswerOption_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES "FormSubmissionAnswer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnswerOption" ADD CONSTRAINT "AnswerOption_optionId_fkey" FOREIGN KEY ("optionId") REFERENCES "Option"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PermitResource" ADD CONSTRAINT "PermitResource_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "FormSubmission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormSubmissionApproval" ADD CONSTRAINT "FormSubmissionApproval_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "FormSubmission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormSubmissionLog" ADD CONSTRAINT "FormSubmissionLog_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "FormSubmission"("id") ON DELETE CASCADE ON UPDATE CASCADE;
