import { Router } from "express";
import KiryuuScrapper from "../scrapper/kiryuu";

const route = Router();
const kiryuu = new KiryuuScrapper();

route.get("/", async (req, res) => {
    const page = req.query.page;
    const search = <string>req.query.search;

    if (search) {
        res.status(200).json(
            await kiryuu.mangaSearch(search, <number>(<unknown>page)),
        );
    } else {
        res.status(200).json(await kiryuu.home(<number>(<unknown>page)));
    }
});

route.get("/project", async (req, res) => {
    const page = req.query.page;

    res.status(200).json(await kiryuu.mangaProject(<number>(<unknown>page)));
});

route.get("/manga/:id", async (req, res) => {
    const id = req.params.id;
    // const manga: any = await kiryuu.mangaInfo(id);
    // res.send(`<h1>${manga.details.infos[7].value}</h1>`);
    res.status(200).json(await kiryuu.mangaInfo(id));
});

route.get("/read/:id", async (req, res) => {
    const id = req.params.id;
    const readmode = req.query.readmode;

    const mangaImage: any = await kiryuu.mangaRead(id);

    if (readmode === "true") {
        let html =
            "<body style='background-color:rgb(25,25,25);'><div style='width: 100%;display: flex;flex-direction: column;justify-content: center;align-items: center;'>";

        for (const manga of mangaImage.manga) {
            html += `<img src='${manga}' width='70%' />`;
        }

        html += "</div></body>";

        res.send(html);
        return;
    }

    res.status(200).json(mangaImage);
});

export default route;
