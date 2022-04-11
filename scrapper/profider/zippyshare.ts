import { extract } from "zs-extract";

export class Zippyshare {
    constructor(private link: string) {
        // const regexRacaty = /https:\/\/www[\d+]\.zippyshare\.com/i;
        // if (!regexRacaty.test(link)) throw new Error("Link tidak valid");
    }

    public async resolve() {
        const result = await extract(this.link);

        return result.download;
    }
}
