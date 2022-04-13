"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio_1 = require("cheerio");
const basescrapper_1 = require("./basescrapper");
class OtakudesuScrapper extends basescrapper_1.BaseScrapper {
    constructor() {
        var _a;
        super((_a = process.env.OTAKUDESULINK) !== null && _a !== void 0 ? _a : "https://otakudesu.site");
    }
    getHome() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.request("/");
            if (this.body) {
                const $ = (0, cheerio_1.load)(this.body);
                const link = this.link;
                const result = $(".venz")
                    .map((i, e) => {
                    const li = $(e).children("ul");
                    return {
                        type: i == 0 ? "Ongoing Anime" : "Complete Anime",
                        data: li
                            .children("li")
                            .map((i, e) => {
                            // i == 0 ? console.log($(this).html()) : 0;
                            var _a;
                            return {
                                id: (_a = $(e)
                                    .children(".detpost")
                                    .children(".thumb")
                                    .children("a")
                                    .attr("href")) === null || _a === void 0 ? void 0 : _a.replace(link + "/anime/", "").replace("/", ""),
                                image: $(e)
                                    .children(".detpost")
                                    .children(".thumb")
                                    .children("a")
                                    .children(".thumbz")
                                    .children("img")
                                    .attr("src"),
                                title: $(e)
                                    .children(".detpost")
                                    .children(".thumb")
                                    .children("a")
                                    .children(".thumbz")
                                    .children("h2")
                                    .text(),
                                episode: $(e)
                                    .children(".detpost")
                                    .children(".epz")
                                    .text()
                                    .trim(),
                                hari: $(e)
                                    .children(".detpost")
                                    .children(".epztipe")
                                    .text()
                                    .trim(),
                                tanggal: $(e)
                                    .children(".detpost")
                                    .children(".newnime")
                                    .text()
                                    .trim(),
                            };
                        })
                            .get(),
                    };
                })
                    .get();
                return result;
            }
        });
    }
    ongoingAnime(page = 1) {
        return __awaiter(this, void 0, void 0, function* () {
            if (page >= 2) {
                yield this.request("/ongoing-anime/page/" + page + "/");
            }
            else {
                yield this.request("/ongoing-anime");
            }
            if (this.body) {
                const $ = (0, cheerio_1.load)(this.body);
                const link = this.link;
                const result = $(".venz")
                    .map((i, e) => {
                    const li = $(e).children("ul");
                    return li
                        .children("li")
                        .map((i, e) => {
                        var _a;
                        return {
                            id: (_a = $(e)
                                .children(".detpost")
                                .children(".thumb")
                                .children("a")
                                .attr("href")) === null || _a === void 0 ? void 0 : _a.replace(link + "/anime/", "").replace("/", ""),
                            image: $(e)
                                .children(".detpost")
                                .children(".thumb")
                                .children("a")
                                .children(".thumbz")
                                .children("img")
                                .attr("src"),
                            title: $(e)
                                .children(".detpost")
                                .children(".thumb")
                                .children("a")
                                .children(".thumbz")
                                .children("h2")
                                .text(),
                            episode: $(e)
                                .children(".detpost")
                                .children(".epz")
                                .text()
                                .trim(),
                            hari: $(e)
                                .children(".detpost")
                                .children(".epztipe")
                                .text()
                                .trim(),
                            tanggal: $(e)
                                .children(".detpost")
                                .children(".newnime")
                                .text()
                                .trim(),
                        };
                    })
                        .get();
                })
                    .get();
                return result;
            }
        });
    }
    completeAnime(page = 1) {
        return __awaiter(this, void 0, void 0, function* () {
            if (page >= 2) {
                yield this.request("/complete-anime/page/" + page + "/");
            }
            else {
                yield this.request("/complete-anime");
            }
            if (this.body) {
                const $ = (0, cheerio_1.load)(this.body);
                const link = this.link;
                const result = $(".venz")
                    .map((i, e) => {
                    const li = $(e).children("ul");
                    return li
                        .children("li")
                        .map((i, e) => {
                        var _a;
                        return {
                            id: (_a = $(e)
                                .children(".detpost")
                                .children(".thumb")
                                .children("a")
                                .attr("href")) === null || _a === void 0 ? void 0 : _a.replace(link + "/anime/", "").replace("/", ""),
                            image: $(e)
                                .children(".detpost")
                                .children(".thumb")
                                .children("a")
                                .children(".thumbz")
                                .children("img")
                                .attr("src"),
                            title: $(e)
                                .children(".detpost")
                                .children(".thumb")
                                .children("a")
                                .children(".thumbz")
                                .children("h2")
                                .text(),
                            episode: $(e)
                                .children(".detpost")
                                .children(".epz")
                                .text()
                                .trim(),
                            hari: $(e)
                                .children(".detpost")
                                .children(".epztipe")
                                .text()
                                .trim(),
                            tanggal: $(e)
                                .children(".detpost")
                                .children(".newnime")
                                .text()
                                .trim(),
                        };
                    })
                        .get();
                })
                    .get();
                return result;
            }
        });
    }
    searchAnime(query) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.request(`?s=${query}&post_type=anime`);
            if (this.body) {
                const $ = (0, cheerio_1.load)(this.body);
                const link = this.link;
                const result = $(".chivsrc")
                    .children("li")
                    .map((_, e) => {
                    var _a;
                    const li = (0, cheerio_1.load)(e);
                    return {
                        id: (_a = li("h2")
                            .children("a")
                            .attr("href")) === null || _a === void 0 ? void 0 : _a.replace(link + "/anime/", "").replace("/", ""),
                        title: li("h2").children("a").text(),
                        img: li("img").attr("src"),
                        details: li(".set")
                            .map((_, e) => {
                            return li(e).text();
                        })
                            .get(),
                    };
                });
                return result.get();
            }
        });
    }
    animeDetail(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.request("/anime/" + id);
            if (this.body) {
                const isi = (0, cheerio_1.load)(this.body);
                const link = this.link;
                const result = {
                    details: isi(".fotoanime")
                        .children(".infozin")
                        .children(".infozingle")
                        .children("p")
                        .map((_, e) => {
                        return isi(e).text();
                    })
                        .get(),
                    image: isi(".fotoanime").children("img").attr("src"),
                    episodes: isi(".episodelist")
                        .map((i, e) => {
                        if (i == 1) {
                            return isi(e)
                                .children("ul")
                                .children("li")
                                .map((_, e) => {
                                var _a;
                                return {
                                    id: (_a = isi(isi(e).children("span").get(0))
                                        .children("a")
                                        .attr("href")) === null || _a === void 0 ? void 0 : _a.replace(link, "").replace(/\//g, ""),
                                    judul: isi(isi(e).children("span").get(0))
                                        .children("a")
                                        .text(),
                                    tanggal: isi(isi(e).children("span").get(1)).text(),
                                };
                            })
                                .get();
                        }
                    })
                        .get(),
                    sinopsis: isi(".sinopc")
                        .children("p")
                        .map((_, e) => {
                        return isi(e).text();
                    })
                        .get(),
                    rekomendasi: isi(".isi-recommend-anime-series")
                        .children(".isi-konten")
                        .map((_, e) => {
                        var _a;
                        return {
                            id: (_a = isi(e)
                                .children(".gambar-konten")
                                .children(".isi-anime")
                                .children("a")
                                .attr("href")) === null || _a === void 0 ? void 0 : _a.replace(link + "/anime/", "").replace(/\//g, ""),
                            image: isi(e)
                                .children(".gambar-konten")
                                .children(".isi-anime")
                                .children("a")
                                .children("img")
                                .attr("src"),
                            title: isi(e)
                                .children(".gambar-konten")
                                .children(".isi-anime")
                                .children("span")
                                .text(),
                        };
                    })
                        .get(),
                };
                return result;
            }
        });
    }
    animeVideo(id, req) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.request("/" + id);
            if (this.body) {
                const $ = (0, cheerio_1.load)(this.body);
                const totalDownloader = $(".download").children("ul").length;
                // console.log(totalDownloader);
                let mp4 = $($(".download").children("ul").get(0))
                    .children("li")
                    // .children("ul")
                    // .children("li")
                    .map((_, e) => {
                    return {
                        resolusi: $(e)
                            .children("strong")
                            .text()
                            .trim()
                            .replace(/Mp4\s/gi, "")
                            .toLowerCase(),
                        downloadLink: this.clearResolution($(e)
                            .children("a")
                            .map((_, e) => {
                            return {
                                prov: $(e).text().trim().toLowerCase(),
                                link: $(e).attr("href"),
                            };
                        })
                            .get()),
                        ukuran: $(e).children("i").text(),
                    };
                })
                    .get();
                const mkv = $($(".download").children("ul").get(1))
                    .children("li")
                    // .children("ul")
                    // .children("li")
                    .map((_, e) => {
                    return {
                        resolusi: $(e)
                            .children("strong")
                            .text()
                            .trim()
                            .replace(/mkv\s/gi, "")
                            .toLowerCase(),
                        downloadLink: this.clearResolution($(e)
                            .children("a")
                            .map((_, e) => {
                            return {
                                prov: $(e).text().trim().toLowerCase(),
                                link: $(e).attr("href"),
                            };
                        })
                            .get()),
                        ukuran: $(e).children("i").text(),
                    };
                })
                    .get();
                if (!mp4.length || !mp4) {
                    mp4 = $($(".download").children("ul").get(0))
                        .children("li")
                        .children("ul")
                        .children("li")
                        .map((_, e) => {
                        return {
                            resolusi: $(e)
                                .children("strong")
                                .text()
                                .trim()
                                .replace(/Mp4\s/gi, "")
                                .toLowerCase(),
                            downloadLink: this.clearResolution($(e)
                                .children("a")
                                .map((_, e) => {
                                return {
                                    prov: $(e)
                                        .text()
                                        .trim()
                                        .toLowerCase(),
                                    link: $(e).attr("href"),
                                };
                            })
                                .get()),
                            ukuran: $(e).children("i").text(),
                        };
                    })
                        .get();
                }
                let embed = {};
                if (req === null || req === void 0 ? void 0 : req.useEmbed) {
                    const p720 = yield this.getEmbed(id, "720p", req === null || req === void 0 ? void 0 : req.mirror720);
                    const p360 = yield this.getEmbed(id, "360p", req === null || req === void 0 ? void 0 : req.mirror360);
                    const p480 = yield this.getEmbed(id, "", req === null || req === void 0 ? void 0 : req.mirror480);
                    embed = {
                        "320p": p360 === null || p360 === void 0 ? void 0 : p360.embedUrl,
                        "480p": p480 === null || p480 === void 0 ? void 0 : p480.embedUrl,
                        "720p": p720 === null || p720 === void 0 ? void 0 : p720.embedUrl,
                        total: p720 === null || p720 === void 0 ? void 0 : p720.mirrorCount,
                    };
                }
                return {
                    mp4,
                    mkv,
                    embed,
                };
            }
        });
    }
    jadwalRilis(_) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.request("/jadwal-rilis");
            // console.log(this.body);
            if (this.body) {
                const $ = (0, cheerio_1.load)(this.body);
                const link = this.link;
                // console.log($(".kglist321").html());
                const result = $(".page")
                    .find(".kglist321")
                    .map((_, e) => {
                    return {
                        hari: $(e).children("h2").text(),
                        anime: $(e)
                            .find("li")
                            .map((_, e) => {
                            var _a;
                            return {
                                id: (_a = $(e)
                                    .find("a")
                                    .attr("href")) === null || _a === void 0 ? void 0 : _a.replace(link + "/anime/", "").replace("/", ""),
                                title: $(e).find("a").text(),
                            };
                        })
                            .get(),
                    };
                })
                    .get();
                return result;
            }
        });
    }
    getGenre(genre, page) {
        return __awaiter(this, void 0, void 0, function* () {
            if (genre)
                yield this.request(page ? `/genres/${genre}/page/${page}/` : `/genres/${genre}/`);
            else
                yield this.request("/genre-list/");
            if (this.body) {
                const $ = (0, cheerio_1.load)(this.body);
                const link = this.link;
                let res;
                if (genre) {
                    // console.log($(".page").html());
                    res = $(".page")
                        .find(".col-md-4.col-anime-con")
                        .map((_, el) => {
                        var _a;
                        return ({
                            id: (_a = $(el)
                                .find(".col-anime-title")
                                .children("a")
                                .attr("href")) === null || _a === void 0 ? void 0 : _a.replace(link + "/anime/", "").replace("/", ""),
                            title: $(el).find(".col-anime-title").text(),
                            image: $(el)
                                .find(".col-anime-cover")
                                .children("img")
                                .attr("src"),
                            studio: $(el).find(".col-anime-studio").text(),
                            episode: $(el).find(".col-anime-eps").text(),
                            rating: $(el).find(".col-anime-rating").text(),
                            genre: $(el).find(".col-anime-genre").text(),
                            sinopsis: $(el).find("col-synopsis").text(),
                            date: $(el).find(".col-anime-date").text(),
                        });
                    })
                        .get();
                }
                else {
                    res = $("ul.genres")
                        .find("li")
                        .find("a")
                        .map((i, el) => {
                        var _a;
                        return ({
                            id: (_a = $(el)
                                .attr("href")) === null || _a === void 0 ? void 0 : _a.replace(/(\/genres\/)/g, "").replace("/", ""),
                            name: $(el).text(),
                        });
                    })
                        .get();
                }
                return res;
            }
        });
    }
    getEmbed(id, res = "", index = 1) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.request(`/${id}/?mirror${res ? `-${res}` : ""}=${index}`);
            if (this.body) {
                const $ = (0, cheerio_1.load)(this.body);
                const embedHolder = $("#embed_holder");
                const embedUrl = embedHolder.find("iframe").attr("src");
                const mirror360p = $(embedHolder.find(".mirrorstream").find("ul").get(0)).find("li").length;
                const mirror480p = $(embedHolder.find(".mirrorstream").find("ul").get(1)).find("li").length;
                const mirror720p = $(embedHolder.find(".mirrorstream").find("ul").get(2)).find("li").length;
                const mirrorCount = { mirror360p, mirror480p, mirror720p };
                return { embedUrl, mirrorCount };
            }
        });
    }
    clearResolution(arr) {
        return arr.filter((v) => v.prov.includes("zippyshare") ||
            v.prov.includes("desucloud") ||
            v.prov.includes("racaty") ||
            v.prov.includes("filesim"));
    }
}
exports.default = OtakudesuScrapper;
