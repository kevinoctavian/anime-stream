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
exports.DesuDrive = void 0;
const cheerio_1 = require("cheerio");
const basescrapper_1 = require("../basescrapper");
class DesuDrive extends basescrapper_1.BaseScrapper {
    constructor(link) {
        super(link);
        const regexfilesIm = /https:\/\/desudrive\.com\//i;
        if (regexfilesIm.test(link))
            throw new Error("Link tidak valid");
    }
    resolve() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.request("");
            if (this.body) {
                const $ = (0, cheerio_1.load)(this.body);
                return $("#skip").attr("href");
            }
        });
    }
}
exports.DesuDrive = DesuDrive;
