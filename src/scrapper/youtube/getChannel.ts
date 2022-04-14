import getData from "./baseFetch";
import findVal from "./findVal";

type ObjectPass = { token?: string; api?: string; isVideo?: boolean };
const defaultpass: ObjectPass = { token: "", api: "", isVideo: true };

export async function getChannel(id: string, object: ObjectPass = defaultpass) {
    let { token, api, isVideo } = object;

    const params = isVideo ? "EgZ2aWRlb3M%3D" : "EglwbGF5bGlzdHMgAQ%3D%3D";

    try {
        if (token) {
            let data = await getData(
                "https://www.youtube.com/youtubei/v1/browse?key=" +
                    api +
                    "&token=" +
                    token,
                { browseId: id, params, type: isVideo ? "video" : "playlist" },
            );

            let newVideos: any = data.items;
            const newToken = data.token;

            const videos = [];

            for (let i = 0; i < newVideos.length; i++) {
                const gridRenderer =
                    newVideos[i].gridVideoRenderer ||
                    newVideos[i].gridPlaylistRenderer;

                if (gridRenderer) {
                    if (isVideo) {
                        // console.log("ada video");
                        videos.push(parserVideo(gridRenderer));
                    } else {
                        videos.push(parsePlaylist(gridRenderer));
                    }
                }
            }

            return { videos, token: newToken, api: data.apikey };
        } else {
            const data = await getData(
                "https://www.youtube.com/youtubei/v1/browse",
                { browseId: id, params, type: isVideo ? "video" : "playlist" },
            );
            const apikey = data.apikey;
            const channel = data.items;
            const resToken: string = await findVal(data, "token");
            const videos = [];

            for (let i = 0; i < channel.length; i++) {
                const gridRenderer =
                    channel[i].gridVideoRenderer ||
                    channel[i].gridPlaylistRenderer;

                if (gridRenderer) {
                    if (isVideo) {
                        // console.log("ada video");
                        videos.push(parserVideo(gridRenderer));
                    } else {
                        videos.push(parsePlaylist(gridRenderer));
                    }
                }
            }

            return { videos, token: resToken, api: apikey };
        }
    } catch (error) {
        console.error(error);

        throw error;
    }
}

function parserVideo(vd: any) {
    // console.log(util.inspect(vd, false, 7, true));
    return {
        id: vd.videoId,
        thumbnail: vd.thumbnail.thumbnails,
        title: vd.title.runs[0].text,
        publishedTime: vd.publishedTimeText.simpleText,
        viewCount: vd.viewCountText.simpleText,
    };
}

function parsePlaylist(pl: any) {
    return {
        id: pl.playlistId,
        thumbnails: pl.thumbnail.thumbnails,
        title: pl.title.runs[0].text,
        videoCount:
            pl.videoCountText.runs[0].text + pl.videoCountText.runs[1].text,
        publishedTime: pl.publishedTimeText?.simpleText,
    };
}
