import nurlresolver from "nurlresolver";

export class Racaty {
    constructor(private link: string) {
        const regexRacaty = /https:\/\/racaty\.net/i;

        if (!regexRacaty.test(link)) throw new Error("Link tidak valid");
    }

    public async resolve() {
        const result = await nurlresolver.resolve(this.link);

        if (result.length === 0) throw new Error("Link tidak bisa di resolve");

        return result[0].link;
    }
}
