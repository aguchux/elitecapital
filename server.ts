// setup express serve

import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import ejs from "ejs";
import path from "path";
import { PrismaClient } from "@prisma/client";

ejs.delimiter = "%";

const prisma = new PrismaClient();
const server = express();
server.use(cors());
server.use(express.json());

server.use(express.urlencoded({ extended: true }));

//setup ejs engines and views folder
server.set("view engine", "ejs");
server.set("views", [
  path.join(__dirname, "views"),
  path.join(__dirname, "views/pages/"),
]);

// setup public folder
server.use(express.static(path.join(__dirname, "public")));
// add assets folder in public folder
server.use("/assets", express.static(path.join(__dirname, "public", "assets")));
// middleware
server.use(async (req: Request, res: Response, next: NextFunction) => {
  res.locals.settings = {
    siteUrl: "https://ecfgllc.com/",
    siteName: "Elite Capital Funding Group LLC",
    siteEmail: "info@ecfgllc.com",
    siteFirstMobile: "1-484-558-0162",
    siteSecondMobile: "1-484-750-5611",
    siteAddress: "4, Rexdale Blvd Etobicoke ON M9W 1N6, Canada",
    siteLogo: "/images/logo.png",
    siteTitle: "Elite Capital Funding Group LLC",
    siteFooterTitle:
      "Elite Capital Funding Group LLC is a loan, investment, and venture capital firm that provides funding options for businesses and individuals.",
    siteDescription:
      "Elite Capital Funding Group LLC is a loan, investment, and venture capital firm that provides funding options for businesses and individuals. Contact us today to learn more about our flexible repayment terms and competitive interest rates.",
    siteKeywords:
      "business loans, personal loans, investment services, venture capital funding, loan options, flexible repayment terms, competitive interest rates, SBA loans, commercial real estate loans, equipment financing, merchant cash advances, personal lines of credit, installment loans, payday loans, stocks, bonds, mutual funds, investment strategies, portfolio management, entrepreneurship, startup funding, experienced advisors",
    siteFacebook: "#",
    siteTwitter: "#",
    siteInstagram: "#",
    siteLinkedin: "#",
    siteYouTubeVideo: "C_sOMVv93-E",
  };
  next();
});

server.get("/", async (req: Request, res: Response) => {
  res.render("index", { title: "Home", sitePage: "index" });
});

server.get("/pages", async (req: Request, res: Response) => {
  res.render("index", { title: "Home", sitePage: "index" });
});

server.get("/pages/:page", async (req: Request, res: Response) => {
  const page = req.params.page;
  let pageTitle = ""; // page title
  let pageEjs = "index"; // page title
  switch (page) {
    case "about-us":
      pageTitle = "About Us";
      pageEjs = "about-us";
      break;
    case "contact-us":
      pageTitle = "Contact Us";
      pageEjs = "contact-us";
      break;
    case "apply-for-loan":
      pageTitle = "Loan Application";
      pageEjs = "apply-for-loan";
      break;
    case "advisory":
      pageTitle = "Advisory Services";
      pageEjs = "advisory";
      break;
    case "core-services":
      pageTitle = "Our Core Services";
      pageEjs = "core-services";
      break;
    case "vc-products":
      pageTitle = "Venture Capital Fundings";
      pageEjs = "vc-products";
      break;
    case "news":
      pageTitle = "Elite News";
      pageEjs = "news";
      break;
    case "our-services":
      pageTitle = "Our Services";
      pageEjs = "our-services";
      break;
    case "faqs":
      pageTitle = "Frequently Asked Questions";
      pageEjs = "faqs";
      break;
    case "login":
      pageTitle = "Manage Applications";
      pageEjs = "login";
      break;
    default:
      pageTitle = "Home";
      break;
  }
  res.render(`${pageEjs}`, { title: pageTitle, sitePage: pageEjs });
});

server.get("/crons", async (req: Request, res: Response) => {
  res.send("Cron job running");
});

server.get("/sitemap", async (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "sitemap.xml"));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, async () => {
  console.log(`Server http://localhost:${PORT}`);
});
