import axios, { AxiosRequestConfig } from "axios";
import findVal from "./findVal";
import decodeHex from "./decodeHex";

export default async function getData(urlstring: string, params?: any) {
    const dataRegex = /var\ ytInitialData\ \=\ \'(.*)\'\;<\/script>/;
    const playerRegex = /var\ ytInitialPlayerResponse\ \=\ (.*)id\=\"player\"/s;

    const dateRegex = /publishDate":"(.*)","ownerChannelName/;
    const apiRegex = /"innertubeApiKey":"(.*?)"/;
    let url = new URL(urlstring);
    let isAjax = false;
    let isDate = false;
    let isSubtitles = false;
    let body;
    if (url.searchParams.get("token") || urlstring.includes("youtubei")) {
        isAjax = true;
    }
    if (url.searchParams.get("type") === "date") {
        isDate = true;
    }
    if (url.searchParams.get("type") === "subtitles") {
        isSubtitles = true;
    }
    let headers: AxiosRequestConfig;

    if (isAjax) {
        const data = {
            context: {
                client: {
                    clientName: "WEB",
                    clientVersion: "2.20210401.08.00",
                },
            },
            continuation: url.searchParams.get("token"),
            params: params.params,
            browseId: params.browseId,
        };

        body = await (
            await axios({ method: "post", url: urlstring, data: data })
        ).data;

        // console.log(
        //     body.contents?.twoColumnBrowseResultsRenderer.tabs[1].tabRenderer
        //         .content,
        // );

        // for (const tab of body.contents?.twoColumnBrowseResultsRenderer.tabs) {
        //     console.log(tab.tabRenderer?.title);
        // }

        if (params.type === "video") {
            return {
                items: parserContent(body, 1),
                token: findVal(body, "token"),
            };
        } else if (params.type === "playlist") {
            return {
                items: parserContent(body, 2),
                token: findVal(body, "token"),
            };
        }

        return {
            items: findVal(body, "continuationItems"),
            token: findVal(body, "token"),
            apikey: "AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8",
        };
    } else {
        headers = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "x-youtube-client-name": 1,
                "x-youtube-client-version": "2.20200911.04.00",
                "User-Agent":
                    "Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Mobile Safari/537.36",
            },
            method: "post",
        };
        body = (await axios(urlstring, headers)).data;
        if (isDate) {
            const raw = dateRegex.exec(body)?.[1] || "{}";
            return raw;
        } else {
            const raw = dataRegex.exec(body)?.[1] || "{}";
            const apikey = apiRegex.exec(body)[1] || "";

            let data = JSON.parse(await decodeHex(raw));
            data.apikey = apikey;
            return data;
        }
    }
}

function parserContent(data: any, index: number) {
    return (
        data.contents?.twoColumnBrowseResultsRenderer.tabs[index].tabRenderer
            .content?.sectionListRenderer.contents[0].itemSectionRenderer
            .contents[0].gridRenderer.items ||
        data.onResponseReceivedActions[0].appendContinuationItemsAction
            .continuationItems
    );
}
