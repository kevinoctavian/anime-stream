import express from "express";
import cors from "cors";
import router from "./routes";
import morgan from "morgan";
import path from "path";
import cookieParser from "cookie-parser";

import HomeRoute from "./routes/web";

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(morgan("combined"));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "pug");

app.use("/", HomeRoute);
app.use("/api", router);

app.listen(PORT, () =>
    console.log("Server is running in PORT: " + PORT, process.cpuUsage()),
);
