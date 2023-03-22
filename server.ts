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
  const sitSettings = await prisma.settings.findFirst();
  res.locals.settings = sitSettings;
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

const PORT = process.env.PORT || 3000;
server.listen(PORT, async () => {
  // Prisma connection
  await prisma
    .$connect()
    .then(() => {
      console.log(`Prisma connected`);
    })
    .catch((err) => {
      console.log(`Prisma error: ${err}`);
    });
  console.log(`Server http://localhost:${PORT}`);
});
