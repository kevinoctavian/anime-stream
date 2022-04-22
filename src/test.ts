import Kiryuu from "./scrapper/kiryuu";

(async () => {
    const kiryu = new Kiryuu();

    console.log(await kiryu.mangaInfo("runway-de-waratte"));
})();
