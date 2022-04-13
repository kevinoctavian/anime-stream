import { Router } from "express";
import ffmpegStatic from "ffmpeg-static";
import ffprobeStatic from "ffprobe-static";

import fluentFfmpeg from "fluent-ffmpeg";

const route = Router();
// const zippyUrl = "https://www119.zippyshare.com/v/fAXzxkQW/file.html";

route.get("/", async (req, res) => {
    const query = <string>req.query.url;

    console.log(req.headers.range);

    const ffmpeg = fluentFfmpeg(query);
    // ffmpeg.setFfmpegPath(ffmpegStatic);
    // ffmpeg.setFfprobePath(ffprobeStatic.path);

    ffmpeg
        .setAspectRatio("16:8")
        .FPS(24)
        .addOutputOptions(
            "-movflags +frag_keyframe+separate_moof+omit_tfhd_offset+empty_moov",
        )
        .audioCodec("copy")
        .videoCodec("copy")
        .format("mp4");
    ffmpeg.on("error", (e) => {
        console.error(e);
    });

    ffmpeg.ffprobe((err, data) => {
        if (err) return res.status(400);

        res.writeHead(200, null, {
            "Content-Length": data.format.size,
            "Content-Type": "video/mp4",
        });

        ffmpeg.pipe(res, { end: true });
    });

    // res.send(ffmpegStatic);
});

export default route;
