/*
  Warnings:

  - You are about to drop the column `status` on the `WorkPermit` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[no]` on the table `WorkPermit` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `no` to the `WorkPermit` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ApprovalStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "WorkPermit" DROP COLUMN "status",
ADD COLUMN     "no" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "WorkPermitApproval" (
    "id" SERIAL NOT NULL,
    "workPermitId" INTEGER NOT NULL,
    "approverId" BIGINT NOT NULL,
    "role" TEXT NOT NULL,
    "status" "ApprovalStatus" NOT NULL DEFAULT 'PENDING',
    "reason" TEXT,
    "approvedAt" TIMESTAMP(3),

    CONSTRAINT "WorkPermitApproval_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WorkPermitApproval_workPermitId_role_key" ON "WorkPermitApproval"("workPermitId", "role");

-- CreateIndex
CREATE UNIQUE INDEX "WorkPermit_no_key" ON "WorkPermit"("no");

-- AddForeignKey
ALTER TABLE "WorkPermitApproval" ADD CONSTRAINT "WorkPermitApproval_workPermitId_fkey" FOREIGN KEY ("workPermitId") REFERENCES "WorkPermit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkPermitApproval" ADD CONSTRAINT "WorkPermitApproval_approverId_fkey" FOREIGN KEY ("approverId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
