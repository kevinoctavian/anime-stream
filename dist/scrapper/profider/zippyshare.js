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
exports.Zippyshare = void 0;
const zs_extract_1 = require("zs-extract");
class Zippyshare {
    constructor(link) {
        this.link = link;
        // const regexRacaty = /https:\/\/www[\d+]\.zippyshare\.com/i;
        // if (!regexRacaty.test(link)) throw new Error("Link tidak valid");
    }
    resolve() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield (0, zs_extract_1.extract)(this.link);
            return result.download;
        });
    }
}
exports.Zippyshare = Zippyshare;
