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
exports.BaseScrapper = void 0;
const axios_1 = __importDefault(require("axios"));
class BaseScrapper {
    constructor(link, option) {
        this.header = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36",
        };
        this._link = link;
        this.header = Object.assign(Object.assign({}, this.header), option);
    }
    get link() {
        return this._link;
    }
    request(route) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(this._link + route);
            const { data, headers } = yield axios_1.default.get(this._link + route, {
                headers: this.header,
            });
            // console.log(headers);
            this.body = yield data;
        });
    }
    post(route, data) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(this._link + route);
            const ax = yield axios_1.default.post(this._link + route, data, {
                headers: this.header,
            });
            // console.log(headers);
            this.body = yield ax.data;
        });
    }
}
exports.BaseScrapper = BaseScrapper;
