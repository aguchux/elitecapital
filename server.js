"use strict";
// setup express serve
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const ejs_1 = __importDefault(require("ejs"));
const path_1 = __importDefault(require("path"));
const client_1 = require("@prisma/client");
ejs_1.default.delimiter = "%";
const prisma = new client_1.PrismaClient();
const server = (0, express_1.default)();
server.use((0, cors_1.default)());
server.use(express_1.default.json());
server.use(express_1.default.urlencoded({ extended: true }));
//setup ejs engines and views folder
server.set("view engine", "ejs");
server.set("views", [
    path_1.default.join(__dirname, "views"),
    path_1.default.join(__dirname, "views/pages/"),
]);
// setup public folder
server.use(express_1.default.static(path_1.default.join(__dirname, "public")));
// add assets folder in public folder
server.use("/assets", express_1.default.static(path_1.default.join(__dirname, "public", "assets")));
// middleware
server.use((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.locals.settings = "./data/site.json";
    console.log(res.locals.settings);
    next();
}));
server.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("index", { title: "Home", sitePage: "index" });
}));
server.get("/pages", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("index", { title: "Home", sitePage: "index" });
}));
server.get("/pages/:page", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
}));
server.get("/crons", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("Cron job running");
}));
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Server http://localhost:${PORT}`);
}));
