/*
  Warnings:

  - A unique constraint covering the columns `[ip]` on the table `Visitor` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Visitor_ip_key" ON "Visitor"("ip");
