import { Router } from "express";
// import OtakudesuScrapper from "../scrapper/otakudesu";
import axios from "axios";
import { ParsedQs } from "qs";
// import otakudata from "../otakudata.json";

const route = Router();

route.get("/", async (req, res) => {
    const search = req.query.search;

    if (!search) {
        const home = await (
            await axios.get(`${getLink(req.hostname)}/api/otakudesu`)
        ).data;

        res.render("index", { home });
    } else {
        const searchFetch = await (
            await axios.get(
                `${getLink(req.hostname)}/api/otakudesu/?search=${search}`,
            )
        ).data;

        res.render("search", { search: searchFetch, searchDetail: search });
    }
});

route.get("/anime/:id", async (req, res) => {
    const anime = await (
        await axios.get(
            `${getLink(req.hostname)}/api/otakudesu/anime/${req.params.id}`,
        )
    ).data;

    res.render("anime", { anime, id: req.params.id });
});

route.get("/watch/:id", async (req, res) => {
    let file = req.query.file || "mp4";
    const type = req.query.type || "zippyshare";
    const resolution =
        req.query.resolution || req.cookies.pResolution || "480p";
    const animeId = req.query.animeId;

    if (!animeId) return res.redirect("/");

    const stream = await (
        await axios.get(
            `
            ${getLink(req.hostname)}/api/otakudesu/download/${
                req.params.id
            }/?resolution=${resolution}&type=${type}&file=${file}
            `,
        )
    ).data;

    const anime = await (
        await axios.get(
            `
            ${getLink(req.hostname)}/api/otakudesu/anime/${animeId}
            `,
        )
    ).data;

    if (req.cookies.pResolution)
        res.cookie("pResolution", "480p", { maxAge: 14 * 24 * 36e5 });

    if (file === "mkv") stream.stream = "/api/stream/?url=" + stream.stream;
    if (stream.mkv.length === 0) file = "mp4";

    console.log();

    const current = stream[<string>file].find(
        (v: { resolusi: string }) => v.resolusi === resolution,
    );

    res.render("stream", {
        anime,
        id: animeId,
        thisId: req.params.id,
        stream,
        currentStream: current,
        currentProfiver: current.downloadLink.find(
            (v: { prov: string }) => v.prov === type,
        ),
        file,
    });
});

route.get("/jadwalrilis", async (req, res) => {
    const jadwal = await (
        await axios.get(
            `
            ${getLink(req.hostname)}/api/otakudesu/jadwalrilis
            `,
        )
    ).data;

    console.log(jadwal);
    res.render("jadwalrilis", { jadwal });
});

route.get("/genres", async (req, res) => {
    const genres = await (
        await axios.get(
            `
            ${getLink(req.hostname)}/api/otakudesu/genres
            `,
        )
    ).data;

    res.render("genres", { genres });
});

route.get("/genres/:id", async (req, res) => {
    const genres = await (
        await axios.get(
            `
            ${getLink(req.hostname)}/api/otakudesu/genres/${req.params.id}
            `,
        )
    ).data;

    res.render("genresview", { genres, id: req.params.id });
});

function getLink(hostname: string) {
    if (hostname === "localhost") return `http://${hostname}:5000`;
    else `https://hostname`;
}

export default route;
