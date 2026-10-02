ALTER TABLE "Application" ADD COLUMN "requestKey" TEXT, ADD COLUMN "requestHash" TEXT, ADD COLUMN "quoteAmount" DECIMAL(14,2), ADD COLUMN "quoteScope" TEXT, ADD COLUMN "quoteValidUntil" TEXT, ADD COLUMN "nextContactDate" TEXT;
CREATE UNIQUE INDEX "Application_requestKey_key" ON "Application"("requestKey");
CREATE TABLE "ApplicationPhoto" ("applicationId" TEXT NOT NULL PRIMARY KEY, "data" BYTEA NOT NULL, CONSTRAINT "ApplicationPhoto_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE CASCADE ON UPDATE CASCADE);
