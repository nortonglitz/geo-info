-- CreateTable
CREATE TABLE "Visistor" (
    "id" SERIAL NOT NULL,
    "ip" TEXT NOT NULL,
    "city" TEXT,
    "region" TEXT,
    "country" TEXT NOT NULL,
    "visitCount" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Visistor_pkey" PRIMARY KEY ("id")
);
