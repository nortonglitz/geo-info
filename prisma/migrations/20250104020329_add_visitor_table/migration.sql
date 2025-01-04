/*
  Warnings:

  - You are about to drop the `Visistor` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Visistor";

-- CreateTable
CREATE TABLE "Visitor" (
    "id" SERIAL NOT NULL,
    "ip" TEXT NOT NULL,
    "city" TEXT,
    "region" TEXT,
    "country" TEXT,
    "visitCount" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Visitor_pkey" PRIMARY KEY ("id")
);
