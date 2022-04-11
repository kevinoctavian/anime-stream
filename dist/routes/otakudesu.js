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
const otakudesu_1 = __importDefault(require("../scrapper/otakudesu"));
const profider_1 = require("../scrapper/profider");
const route = (0, express_1.Router)({});
const otaku = new otakudesu_1.default();
route.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    // res.send("hello");
    const query = req.query;
    if (query.search) {
        res.status(200).json(yield otaku.searchAnime(query.search));
        return;
    }
    if (query.type === "ongoing") {
        res.status(200).json(yield otaku.ongoingAnime((_a = query.page) !== null && _a !== void 0 ? _a : 1));
    }
    else if (query.type === "complete") {
        res.status(200).json(yield otaku.completeAnime((_b = query.page) !== null && _b !== void 0 ? _b : 1));
    }
    else {
        res.status(200).json(yield otaku.getHome());
    }
}));
route.get("/jadwalrilis", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const jadwal = yield otaku.jadwalRilis();
    // console.log(jadwal);
    res.status(200).json(jadwal);
}));
route.get("/genres", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json(yield otaku.getGenre());
}));
route.get("/anime/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    res.status(200).json(yield otaku.animeDetail(id));
}));
route.get("/download/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const query = req.query;
    let file = query.file ? query.file : "mp4";
    let type = query.type ? query.type : "zippyshare";
    let resolusi = query.resolution ? query.resolution : "480p";
    // console.log(query);
    const anime = yield otaku.animeVideo(id, {
        mirror360: query.mirror360,
        mirror480: query.mirror480,
        mirror720: query.mirror720,
        useEmbed: query.useEmbed || false,
    });
    if (resolusi === "1080p")
        file = "mkv";
    //kalo type file tidak ada
    if ((anime === null || anime === void 0 ? void 0 : anime.mkv.length) === 0)
        file = "mp4";
    if ((anime === null || anime === void 0 ? void 0 : anime.mp4.length) === 0)
        file = "mkv";
    // kalo resolusi tidak ada
    if (anime[file].find((v) => v.resolusi === resolusi) === undefined) {
        // console.log(anime);
        resolusi = anime[file][0].resolusi;
    }
    //kalo profider tidak ditemukan
    if (anime[file].find((v) => v.downloadLink.find((a) => a.prov === type)) === undefined) {
        type = "zippyshare";
    }
    let stream;
    let link = getProvider(anime, file, type, resolusi);
    switch (query.type || type) {
        case "zippyshare":
            const zippy = new profider_1.Zippyshare(link.link);
            stream = yield zippy.resolve();
            break;
        case "racaty":
            const racaty = new profider_1.Racaty(link.link);
            stream = yield racaty.resolve();
            break;
        case "filesim":
            const filesim = new profider_1.Filesim(link.link);
            stream = yield filesim.resolve();
            break;
        case "desucloud":
            const desudrive = new profider_1.DesuDrive(link.link);
            stream = yield desudrive.resolve();
            break;
    }
    res.status(200).json(Object.assign(Object.assign({}, anime), { stream }));
}));
route.get("/genres/:genre", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const genre = req.params.genre;
    const page = req.query;
    res.status(200).json(yield otaku.getGenre(genre, page.page));
}));
route.use((req, res) => {
    res.redirect("/otakudesu/");
});
function getProvider(anime, file, type, resolusi) {
    var _a;
    return (_a = anime[file]
        .find((v) => v.resolusi === resolusi)) === null || _a === void 0 ? void 0 : _a.downloadLink.find((v) => v.prov === type);
}
exports.default = route;
