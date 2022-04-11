"use strict";
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
const express_1 = require("express");
// import OtakudesuScrapper from "../scrapper/otakudesu";
const axios_1 = __importDefault(require("axios"));
// import otakudata from "../otakudata.json";
const route = (0, express_1.Router)();
route.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const search = req.query.search;
    if (!search) {
        const home = yield (yield axios_1.default.get(`${getLink(req.hostname)}/api/otakudesu`)).data;
        res.render("index", { home });
    }
    else {
        const searchFetch = yield (yield axios_1.default.get(`${getLink(req.hostname)}/api/otakudesu/?search=${search}`)).data;
        res.render("search", { search: searchFetch, searchDetail: search });
    }
}));
route.get("/anime/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const anime = yield (yield axios_1.default.get(`${getLink(req.hostname)}/api/otakudesu/anime/${req.params.id}`)).data;
    res.render("anime", { anime, id: req.params.id });
}));
route.get("/watch/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let file = req.query.file || "mp4";
    const type = req.query.type || "zippyshare";
    const resolution = req.query.resolution || req.cookies.pResolution || "480p";
    const animeId = req.query.animeId;
    if (!animeId)
        return res.redirect("/");
    const stream = yield (yield axios_1.default.get(`
            ${getLink(req.hostname)}/api/otakudesu/download/${req.params.id}/?resolution=${resolution}&type=${type}&file=${file}
            `)).data;
    const anime = yield (yield axios_1.default.get(`
            ${getLink(req.hostname)}/api/otakudesu/anime/${animeId}
            `)).data;
    if (req.cookies.pResolution)
        res.cookie("pResolution", "480p", { maxAge: 14 * 24 * 36e5 });
    if (file === "mkv")
        stream.stream = "/api/stream/?url=" + stream.stream;
    if (stream.mkv.length === 0)
        file = "mp4";
    console.log();
    const current = stream[file].find((v) => v.resolusi === resolution);
    res.render("stream", {
        anime,
        id: animeId,
        thisId: req.params.id,
        stream,
        currentStream: current,
        currentProfiver: current.downloadLink.find((v) => v.prov === type),
        file,
    });
}));
route.get("/jadwalrilis", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const jadwal = yield (yield axios_1.default.get(`
            ${getLink(req.hostname)}/api/otakudesu/jadwalrilis
            `)).data;
    console.log(jadwal);
    res.render("jadwalrilis", { jadwal });
}));
route.get("/genres", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const genres = yield (yield axios_1.default.get(`
            ${getLink(req.hostname)}/api/otakudesu/genres
            `)).data;
    res.render("genres", { genres });
}));
route.get("/genres/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const genres = yield (yield axios_1.default.get(`
            ${getLink(req.hostname)}/api/otakudesu/genres/${req.params.id}
            `)).data;
    res.render("genresview", { genres, id: req.params.id });
}));
function getLink(hostname) {
    if (hostname === "localhost")
        return `http://${hostname}:5000`;
    else
        return `https://${hostname}`;
}
exports.default = route;
