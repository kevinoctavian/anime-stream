import { Router } from "express";
import { getInfo } from "ytdl-core";
import { channelQuery } from "../types/youtubeTypes";

const route = Router();

route.get("/", (req, res) => {
    res.send("ini youtube");
});

route.get("/channel/:id", async (req, res) => {
    const channelId = req.params.id;

    res.status(200).json({ message: "undercontruc" });
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
