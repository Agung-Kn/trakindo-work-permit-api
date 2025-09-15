-- AlterEnum
ALTER TYPE "QuestionType" ADD VALUE 'FILE';

-- AlterTable
ALTER TABLE "form_submission_items" ADD COLUMN     "sectionId" BIGINT;

-- AlterTable
ALTER TABLE "questions" ADD COLUMN     "showIfOptionId" BIGINT;

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "questions_showIfOptionId_fkey" FOREIGN KEY ("showIfOptionId") REFERENCES "options"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "form_submission_items" ADD CONSTRAINT "form_submission_items_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "sections"("id") ON DELETE SET NULL ON UPDATE CASCADE;
