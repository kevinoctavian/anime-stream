import { load } from "cheerio";
import { BaseScrapper } from "../basescrapper";

export class DesuDrive extends BaseScrapper {
    constructor(link: string) {
        super(link);

        const regexfilesIm = /https:\/\/desudrive\.com\//i;

        if (regexfilesIm.test(link)) throw new Error("Link tidak valid");
    }

    public async resolve() {
        await this.request("");

        if (this.body) {
            const $ = load(this.body);

            return $("#skip").attr("href");
        }
    }
}
