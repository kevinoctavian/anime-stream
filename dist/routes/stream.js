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
const ffmpeg_static_1 = __importDefault(require("ffmpeg-static"));
const ffprobe_static_1 = __importDefault(require("ffprobe-static"));
const fluent_ffmpeg_1 = __importDefault(require("fluent-ffmpeg"));
const route = (0, express_1.Router)();
// const zippyUrl = "https://www119.zippyshare.com/v/fAXzxkQW/file.html";
route.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query.url;
    const ffmpeg = (0, fluent_ffmpeg_1.default)(query);
    ffmpeg.setFfmpegPath(ffmpeg_static_1.default);
    ffmpeg.setFfprobePath(ffprobe_static_1.default.path);
    res.header("Content-Type", "video/mp4");
    ffmpeg.ffprobe((err, data) => {
        if (err)
            return res.status(400);
        console.log(data.format);
    });
    ffmpeg
        .setAspectRatio("16:8")
        .FPS(24)
        .addOutputOptions("-movflags +frag_keyframe+separate_moof+omit_tfhd_offset+empty_moov")
        .format("mp4");
    ffmpeg.on("error", (e) => {
        console.error(e);
    });
    ffmpeg.pipe(res, { end: true });
    // res.send(ffmpegStatic);
}));
exports.default = route;
