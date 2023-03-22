/*
  Warnings:

  - You are about to drop the column `email` on the `Settings` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Settings` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Settings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "siteName" TEXT,
    "siteEmail" TEXT,
    "siteFirstMobile" TEXT DEFAULT '1-484-558-0162',
    "siteSecondMobile" TEXT DEFAULT '1-484-750-5611',
    "siteAddress" TEXT DEFAULT '4, Rexdale Blvd Etobicoke ON M9W 1N6, Canada',
    "siteLogo" TEXT DEFAULT '/images/logo.png',
    "siteTitle" TEXT DEFAULT 'Elite Capital Funding Group LLC',
    "siteDescription" TEXT DEFAULT 'Elite Capital Funding Group LLC is a loan, investment, and venture capital firm that provides funding options for businesses and individuals. Contact us today to learn more about our flexible repayment terms and competitive interest rates.',
    "siteKeywords" TEXT DEFAULT 'business loans, personal loans, investment services, venture capital funding, loan options, flexible repayment terms, competitive interest rates, SBA loans, commercial real estate loans, equipment financing, merchant cash advances, personal lines of credit, installment loans, payday loans, stocks, bonds, mutual funds, investment strategies, portfolio management, entrepreneurship, startup funding, experienced advisors',
    "siteFacebook" TEXT DEFAULT '#',
    "siteTwitter" TEXT DEFAULT '#',
    "siteInstagram" TEXT DEFAULT '#',
    "siteLinkedin" TEXT DEFAULT '#'
);
INSERT INTO "new_Settings" ("id") SELECT "id" FROM "Settings";
DROP TABLE "Settings";
ALTER TABLE "new_Settings" RENAME TO "Settings";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
