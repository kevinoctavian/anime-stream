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
exports.Racaty = void 0;
const nurlresolver_1 = __importDefault(require("nurlresolver"));
class Racaty {
    constructor(link) {
        this.link = link;
        const regexRacaty = /https:\/\/racaty\.net/i;
        if (!regexRacaty.test(link))
            throw new Error("Link tidak valid");
    }
    resolve() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield nurlresolver_1.default.resolve(this.link);
            if (result.length === 0)
                throw new Error("Link tidak bisa di resolve");
            return result[0].link;
        });
    }
}
exports.Racaty = Racaty;
