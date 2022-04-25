import Nhentai from "./scrapper/nhentai";

(async () => {
    const nhentai = new Nhentai();

    console.log(await nhentai.home());
})();
