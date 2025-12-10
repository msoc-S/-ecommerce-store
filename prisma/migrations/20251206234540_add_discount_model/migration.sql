-- CreateTable
CREATE TABLE "Discount" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT,
    "percentage" REAL,
    "amount" REAL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "productId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Discount_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Discount_code_key" ON "Discount"("code");
