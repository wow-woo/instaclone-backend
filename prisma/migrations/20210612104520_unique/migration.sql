/*
  Warnings:

  - A unique constraint covering the columns `[text]` on the table `HashTag` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "HashTag.text_unique" ON "HashTag"("text");
