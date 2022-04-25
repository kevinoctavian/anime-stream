import { Router } from "express";
import OtakudesuScrapper from "../scrapper/otakudesu";
import { OtakudesuQuery, OtakudesuDownloadType } from "../types/otakudesuTypes";
import { Racaty, DesuDrive, Zippyshare, Filesim } from "../scrapper/profider";

const route = Router({});
const otaku = new OtakudesuScrapper();

route.get("/", async (req, res) => {
    // res.send("hello");
    try {
        const query: OtakudesuQuery = req.query;

        if (query.search) {
            res.status(200).json(await otaku.searchAnime(query.search));
            return;
        }

        if (query.type === "ongoing") {
            res.status(200).json(await otaku.ongoingAnime(query.page ?? 1));
        } else if (query.type === "complete") {
            res.status(200).json(await otaku.completeAnime(query.page ?? 1));
        } else {
            res.status(200).json(await otaku.getHome());
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

route.get("/jadwalrilis", async (req, res) => {
    try {
        const jadwal = await otaku.jadwalRilis();
        // console.log(jadwal);

        res.status(200).json(jadwal);
    } catch (err) {
        res.status(500).send(err);
    }
});

route.get("/genres", async (req, res) => {
    try {
        res.status(200).json(await otaku.getGenre());
    } catch (err) {
        res.status(500).send(err);
    }
});

route.get("/anime/:id", async (req, res) => {
    try {
        const id = req.params.id;

        res.status(200).json(await otaku.animeDetail(id));
    } catch (err) {
        res.status(500).send(err);
    }
});

route.get("/download/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const query: OtakudesuDownloadType = req.query;

        let file = query.file ? query.file : "mp4";
        let type = query.type ? query.type : "zippyshare";
        let resolusi = query.resolution ? query.resolution : "480p";
        // console.log(query);
        const anime = await otaku.animeVideo(id, {
            mirror360: query.mirror360,
            mirror480: query.mirror480,
            mirror720: query.mirror720,
            useEmbed: query.useEmbed || false,
        });

        if (resolusi === "1080p") file = "mkv";

        //kalo type file tidak ada
        if (anime?.mkv.length === 0) file = "mp4";
        if (anime?.mp4.length === 0) file = "mkv";

        // kalo resolusi tidak ada
        if (anime![file].find((v) => v.resolusi === resolusi) === undefined) {
            // console.log(anime);
            resolusi = anime![file][0].resolusi;
        }

        //kalo profider tidak ditemukan
        if (
            anime![file].find((v) =>
                v.downloadLink.find((a) => a.prov === type),
            ) === undefined
        ) {
            type = "zippyshare";
        }

        let stream;

        let link = getProvider(anime, file, type, resolusi);

        switch (query.type || type) {
            case "zippyshare":
                const zippy = new Zippyshare(link!.link);

                stream = await zippy.resolve();
                break;
            case "racaty":
                const racaty = new Racaty(link!.link);

                stream = await racaty.resolve();
                break;
            case "filesim":
                const filesim = new Filesim(link!.link);

                stream = await filesim.resolve();
                break;
            case "desucloud":
                const desudrive = new DesuDrive(link!.link);

                stream = await desudrive.resolve();
                break;
        }

        res.status(200).json({ ...anime, stream });
    } catch (err) {
        res.status(500).send(err);
    }
});

route.get("/genres/:genre", async (req, res) => {
    try {
        const genre = req.params.genre;
        const page: OtakudesuQuery = req.query;

        res.status(200).json(await otaku.getGenre(genre, page.page));
    } catch (err) {
        res.status(500).send(err);
    }
});

route.use((req, res) => {
    res.redirect("/otakudesu/");
});

function getProvider(anime: any, file: string, type: string, resolusi: string) {
    return anime![file]
        .find((v: { resolusi: string }) => v.resolusi === resolusi)
        ?.downloadLink.find((v: { prov: string }) => v.prov === type);
}

export default route;
