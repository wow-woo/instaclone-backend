-- CreateTable
CREATE TABLE "_followship" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_followship_AB_unique" ON "_followship"("A", "B");

-- CreateIndex
CREATE INDEX "_followship_B_index" ON "_followship"("B");

-- AddForeignKey
ALTER TABLE "_followship" ADD FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_followship" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
