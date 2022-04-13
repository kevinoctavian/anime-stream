"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const web_1 = __importDefault(require("./routes/web"));
const PORT = process.env.PORT || 5000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("short"));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
if (process.env.NODE_ENV === "production" || process.argv[2] === "production") {
    app.use(express_1.default.static(path_1.default.join(__dirname, "..", "public")));
    app.set("views", path_1.default.join(__dirname, "..", "views"));
    console.log("Is Production");
}
app.set("view engine", "pug");
app.use("/", web_1.default);
app.use("/api", routes_1.default);
app.listen(PORT, () => console.log("Server is running in PORT: " + PORT, process.cpuUsage(), process.env.NODE_ENV));