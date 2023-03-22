-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Settings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "siteUrl" TEXT DEFAULT 'http://localhost:3000/',
    "siteName" TEXT DEFAULT 'Elite Capital Funding Group LLC',
    "siteEmail" TEXT DEFAULT 'info@elitecapital.com',
    "siteFirstMobile" TEXT DEFAULT '1-484-558-0162',
    "siteSecondMobile" TEXT DEFAULT '1-484-750-5611',
    "siteAddress" TEXT DEFAULT '4, Rexdale Blvd Etobicoke ON M9W 1N6, Canada',
    "siteLogo" TEXT DEFAULT '/images/logo.png',
    "siteTitle" TEXT DEFAULT 'Elite Capital Funding Group LLC',
    "siteFooterTitle" TEXT DEFAULT 'Elite Capital Funding Group LLC is a loan, investment, and venture capital firm that provides funding options for businesses and individuals.',
    "siteDescription" TEXT DEFAULT 'Elite Capital Funding Group LLC is a loan, investment, and venture capital firm that provides funding options for businesses and individuals. Contact us today to learn more about our flexible repayment terms and competitive interest rates.',
    "siteKeywords" TEXT DEFAULT 'business loans, personal loans, investment services, venture capital funding, loan options, flexible repayment terms, competitive interest rates, SBA loans, commercial real estate loans, equipment financing, merchant cash advances, personal lines of credit, installment loans, payday loans, stocks, bonds, mutual funds, investment strategies, portfolio management, entrepreneurship, startup funding, experienced advisors',
    "siteFacebook" TEXT DEFAULT '#',
    "siteTwitter" TEXT DEFAULT '#',
    "siteInstagram" TEXT DEFAULT '#',
    "siteLinkedin" TEXT DEFAULT '#',
    "siteYouTubeVideo" TEXT DEFAULT 'C_sOMVv93-E'
);
INSERT INTO "new_Settings" ("id", "siteAddress", "siteDescription", "siteEmail", "siteFacebook", "siteFirstMobile", "siteFooterTitle", "siteInstagram", "siteKeywords", "siteLinkedin", "siteLogo", "siteName", "siteSecondMobile", "siteTitle", "siteTwitter", "siteYouTubeVideo") SELECT "id", "siteAddress", "siteDescription", "siteEmail", "siteFacebook", "siteFirstMobile", "siteFooterTitle", "siteInstagram", "siteKeywords", "siteLinkedin", "siteLogo", "siteName", "siteSecondMobile", "siteTitle", "siteTwitter", "siteYouTubeVideo" FROM "Settings";
DROP TABLE "Settings";
ALTER TABLE "new_Settings" RENAME TO "Settings";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
