"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const otakudesu_1 = __importDefault(require("./otakudesu"));
const youtube_1 = __importDefault(require("./youtube"));
const stream_1 = __importDefault(require("./stream"));
const router = (0, express_1.Router)();
router.use("/otakudesu", otakudesu_1.default);
router.use("/youtube", youtube_1.default);
router.use("/stream", stream_1.default);
exports.default = router;
