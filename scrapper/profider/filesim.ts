import { load } from "cheerio";
import { BaseScrapper } from "../basescrapper";

export class Filesim extends BaseScrapper {
    private op = "download2";
    private id = "";
    private rand = "";
    private referer = "https://files.im/";
    private method_free = "Free20%Download";
    private method_premium = "";
    private is_hosting = 0;

    constructor(link: string) {
        super(link, {
            "Content-Type": "application/x-www-form-urlencoded",
        });

        const regexfilesIm = /https:\/\/files\.im\//i;

        const id = link.replace(regexfilesIm, "");
        this.id = id;
        this.referer += id;

        console.log(link, id);

        if (!regexfilesIm.test(link)) throw new Error("Link tidak valid");
    }

    public async resolve() {
        const {
            op,
            id,
            rand,
            referer,
            method_free,
            method_premium,
            is_hosting,
        } = this;
        await this.post(
            "",
            `op=${op}&id=${id}&rand=${rand}&referer=${referer}&method_free=${method_free}&method_premium=${method_premium}&is_hosting=${is_hosting}`,
        );

        if (this.body) {
            const $ = load(this.body);

            return $(".btn.btn-dow").attr("href");
        }
    }
}
