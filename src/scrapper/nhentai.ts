import { load } from "cheerio";
import { BaseScrapper } from "./basescrapper";

export default class NHentaiScrapper extends BaseScrapper {
    constructor() {
        super(
            "https://nhentai.net",
            {},
            {
                // proxy: {
                //     host: "1.1.1.1",
                //     port: 80,
                //     protocol: "https",
                // },
            },
        );
    }

    async home() {
        await this.request("/");

        if (this.body) {
            const $ = load(this.body);

            console.log($.html());
        }
    }
}
