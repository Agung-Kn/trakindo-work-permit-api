-- CreateEnum
CREATE TYPE "ItemType" AS ENUM ('EQUIPMENT', 'MACHINE', 'MATERIAL');

-- AlterTable
ALTER TABLE "questions" ADD COLUMN     "required" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "form_submission_safety_equipments" (
    "id" BIGSERIAL NOT NULL,
    "submissionId" BIGINT NOT NULL,
    "safetyEquipmentId" BIGINT NOT NULL,
    "quantity" INTEGER,

    CONSTRAINT "form_submission_safety_equipments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "form_submission_items" (
    "id" BIGSERIAL NOT NULL,
    "submissionId" BIGINT NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "type" "ItemType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "form_submission_items_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "form_submission_safety_equipments" ADD CONSTRAINT "form_submission_safety_equipments_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "form_submissions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "form_submission_safety_equipments" ADD CONSTRAINT "form_submission_safety_equipments_safetyEquipmentId_fkey" FOREIGN KEY ("safetyEquipmentId") REFERENCES "safety_equipments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "form_submission_items" ADD CONSTRAINT "form_submission_items_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "form_submissions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
