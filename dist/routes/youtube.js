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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ytdl_core_1 = require("ytdl-core");
const route = (0, express_1.Router)();
route.get("/", (req, res) => {
    res.send("ini youtube");
});
route.get("/channel/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const channelId = req.params.id;
    res.status(200).json({ message: "undercontruc" });
}));
route.get("/playlist/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const channelId = req.params.id;
    res.status(200).json({ message: "undercontruc" });
}));
route.get("/watch/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const videoId = req.params.id;
    res.status(200).json(yield (0, ytdl_core_1.getInfo)(videoId));
}));
exports.default = route;
