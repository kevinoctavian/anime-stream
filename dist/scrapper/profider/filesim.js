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
exports.Filesim = void 0;
const cheerio_1 = require("cheerio");
const basescrapper_1 = require("../basescrapper");
class Filesim extends basescrapper_1.BaseScrapper {
    constructor(link) {
        super(link, {
            "Content-Type": "application/x-www-form-urlencoded",
        });
        this.op = "download2";
        this.id = "";
        this.rand = "";
        this.referer = "https://files.im/";
        this.method_free = "Free20%Download";
        this.method_premium = "";
        this.is_hosting = 0;
        const regexfilesIm = /https:\/\/files\.im\//i;
        const id = link.replace(regexfilesIm, "");
        this.id = id;
        this.referer += id;
        console.log(link, id);
        if (!regexfilesIm.test(link))
            throw new Error("Link tidak valid");
    }
    resolve() {
        return __awaiter(this, void 0, void 0, function* () {
            const { op, id, rand, referer, method_free, method_premium, is_hosting, } = this;
            yield this.post("", `op=${op}&id=${id}&rand=${rand}&referer=${referer}&method_free=${method_free}&method_premium=${method_premium}&is_hosting=${is_hosting}`);
            if (this.body) {
                const $ = (0, cheerio_1.load)(this.body);
                return $(".btn.btn-dow").attr("href");
            }
        });
    }
}
exports.Filesim = Filesim;
