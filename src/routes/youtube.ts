import { Router } from "express";
import { getInfo } from "ytdl-core";
import { channelQuery } from "../types/youtubeTypes";
import { getChannel } from "../scrapper/youtube/getChannel";

const route = Router();

route.get("/", (req, res) => {
    res.send("ini youtube");
});

route.get("/channel/:id", async (req, res) => {
    const channelId = req.params.id;
    const api = <string | undefined>req.query.api;
    const token = <string | undefined>req.query.token;
    const isVideo = req.query.isVideo ? true : false;

    let channel = getChannel(channelId);
    if (api && token) {
        channel = getChannel(channelId, { api, token, isVideo });
    } else {
        channel = getChannel(channelId);
    }

    res.status(200).json({ channel });
});

route.get("/playlist/:id", async (req, res) => {
    const channelId = req.params.id;

    res.status(200).json({ message: "undercontruc" });
});

route.get("/watch/:id", async (req, res) => {
    const videoId = req.params.id;

    res.status(200).json(await getInfo(videoId));
});

export default route;
