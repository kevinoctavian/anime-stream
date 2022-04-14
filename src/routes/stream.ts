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
        // .addOutputOptions(
        //     "-movflags +frag_keyframe+separate_moof+omit_tfhd_offset+empty_moov",
        // )
        .addOutputOptions("-preset veryfast")
        .audioCodec("libvorbis")
        .videoCodec("libvpx")
        .format("webm");
    ffmpeg.on("error", (e) => {
        console.error(e);
    });

    ffmpeg.ffprobe((err, data) => {
        if (err) return res.status(400);

        let chunkSize = 1024 * 1024;
        const size = data.format.size;
        if (size > chunkSize * 2) {
            chunkSize = Math.ceil(size * 0.25);
        }

        let range: any = req.headers.range
            ? req.headers.range.replace(/bytes=/, "").split("-")
            : [];

        range[0] = range[0] ? parseInt(range[0], 10) : 0;
        range[1] = range[1] ? parseInt(range[1], 10) : range[0] + chunkSize;
        if (range[1] > size - 1) {
            range[1] = size - 1;
        }
        range = { start: range[0], end: range[1] };

        const header = {
            "Content-Length": range.end - range.start + 1,
            "Content-Type": "video/webm",
            "Accept-Ranges": "bytes",
            "Content-Range": `bytes ${range.start}-${range.end}/${size}`,
            "Cache-Control": "no-cache, no-store, must-revalidate",
            Pragma: "no-cache",
            Expires: 0,
        };
        console.log(header);
        res.writeHead(200, null, header);

        ffmpeg.pipe(res, { end: true });
    });

    // res.send(ffmpegStatic);
});

export default route;

/**
 * <video controls="" src="/api/stream/?url=https://www46.zippyshare.com/d/eBF0Vgf8/27062/Otakudesu.site_Komisan.S2--02_Mkv480p.mkv"></video>
 */
