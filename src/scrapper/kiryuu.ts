import { load } from "cheerio";
import { BaseScrapper } from "./basescrapper";

export default class KiryuuScrapper extends BaseScrapper {
    constructor() {
        super("https://kiryuu.id");
    }

    async home(page: number = 1) {
        await this.request(`/${page > 1 ? `page/${page}` : ""}`);

        if (this.body) {
            const $: cheerio.Root = load(this.body);

            const result = {
                terpopuler: $($(".listupd").get(0))
                    .find(".bs")
                    .map((_, el) => {
                        return this._home_bsx($(el));
                    })
                    .get(),
                projectUpdate: $($(".listupd").get(1))
                    .find(".utao")
                    .map((_, el) => {
                        return this._home_utao($(el), $);
                    })
                    .get(),
                rilisTerbaru: $($(".listupd").get(2))
                    .find(".utao")
                    .map((_, el) => {
                        return this._home_utao($(el), $);
                    })
                    .get(),
                rekomendasi: $(".series-gen")
                    .map((_, el) => {
                        return this._home_bsx($(el), "rekomendasi");
                    })
                    .get(),
                serialPopuler: this.serialPopuler($),
                seriesBaru: this.seriesBaru($),
            };

            return result;
        }
    }

    async mangaInfo(id: string) {
        if (!id) return {};

        await this.request("/manga/" + id);

        if (this.body) {
            const $ = load(this.body);

            const result = {
                details: {
                    title: $(".seriestucon")
                        .find("h1.entry-title")
                        .text()
                        .trim(),
                    anotherTitle: $(".seriestucon")
                        .find(".seriestualt")
                        .text()
                        .trim(),
                    image: $(".seriestucon")
                        .find(".seriestucontl")
                        .find("img")
                        .attr("src"),
                    description: $(".seriestucon")
                        .find(".seriestucontentr")
                        .children(".seriestuhead")
                        .children('[itemprop="description"]')
                        .children("p")
                        .text(),
                    genres: $(".seriestucon")
                        .find(".seriestucontr")
                        .children(".seriestugenre")
                        .children("a")
                        .map((_, el) => $(el).text())
                        .get(),
                    infos: $(".seriestucon")
                        .find(".seriestucontr")
                        .children(".infotable")
                        .find("tr")
                        .map((_, el) => {
                            return {
                                key: $($(el).find("td").get(0)).text(),
                                value: $($(el).find("td").get(1))
                                    .text()
                                    .replace(/\n/g, ""),
                            };
                        })
                        .get(),
                },
                chapters: $("#chapterlist")
                    .find("li")
                    .map((_, el) => {
                        return {
                            link: this.clearLink(
                                $(el)
                                    .find(".eph-num")
                                    .children("a")
                                    .attr("href"),
                            ),
                            title: $(el)
                                .find(".eph-num")
                                .find(".chapternum")
                                .text()
                                .trim(),
                            updateAt: $(el)
                                .find(".eph-num")
                                .find(".chapterdate")
                                .text()
                                .trim(),
                            dl: $(el)
                                .find(".eph-num")
                                .children("a")
                                .attr("href"),
                        };
                    })
                    .get(),
                terkait: $(".listupd")
                    .children(".bs")
                    .map((_, el) => {
                        return {
                            link: this.clearLink($(el).find("a").attr("href")),
                            img: $(el)
                                .find(".limit")
                                .children("img")
                                .attr("src"),
                            type: $(el)
                                .find("span.type")
                                .attr("class")
                                .replace("type", "")
                                .trim(),
                            title: $(el).find(".tt").text().replace(/\n/g, ""),
                            totalChapter: $(el).find(".epxs").text(),
                            isColor: $(el).find("span").hasClass("colored")
                                ? true
                                : false,
                        };
                    })
                    .get(),
                serialPopuler: this.serialPopuler($),
                seriesBaru: this.seriesBaru($),
            };

            return result;
        }
    }

    async mangaRead(id: string) {
        if (!id) return {};

        await this.request("/" + id);

        if (this.body) {
            const $ = load(this.body);

            const manga = load(
                load($("#readerarea").find("noscript").html())("p").html(),
            )("img");

            const result = {
                manga: manga.map((_, el: any) => el.attribs.src).get(),
                terkait: $(".listupd")
                    .children(".bs")
                    .map((_, el) => {
                        return {
                            link: this.clearLink($(el).find("a").attr("href")),
                            img: $(el)
                                .find(".limit")
                                .children("img")
                                .attr("src"),
                            type: $(el)
                                .find("span.type")
                                .attr("class")
                                .replace("type", "")
                                .trim(),
                            title: $(el).find(".tt").text().replace(/\n/g, ""),
                            totalChapter: $(el).find(".epxs").text(),
                            isColor: $(el).find("span").hasClass("colored")
                                ? true
                                : false,
                        };
                    })
                    .get(),
            };

            return result;
        }
    }

    async mangaSearch(query: string, page = 1) {
        if (!query) return {};

        await this.request(`/${page > 1 ? `page/${page}/` : ""}?s=${query}`);

        if (this.body) {
            const $ = load(this.body);

            const result = {
                search: $(".listupd")
                    .children(".bs")
                    .map((_, el) => this._home_bsx($(el)))
                    .get(),
                serialPopuler: this.serialPopuler($),
                seriesBaru: this.seriesBaru($),
            };

            return result;
        }
    }

    async mangaProject(page = 1) {
        await this.request(`/project/${page > 1 ? `page/${page}/` : ""}`);

        if (this.body) {
            const $ = load(this.body);

            const result = {
                manga: $(".listupd")
                    .children(".bs")
                    .map((_, el) => this._home_bsx($(el)))
                    .get(),
                serialPopuler: this.serialPopuler($),
                seriesBaru: this.seriesBaru($),
            };

            return result;
        }
    }

    private clearLink(link: string): string {
        return link
            .replace(this.link, "")
            .replace("manga", "")
            .replace(/\//g, "");
    }

    // private area
    private _home_bsx($: cheerio.Cheerio, type?: string) {
        const bsx = $.find(".bsx");

        if (type === "rekomendasi") {
            const nav_tabs = $.find(".nav-tabs").find("li");

            return nav_tabs
                .map((i, el) => {
                    const listupd = load($.html())(".listupd").children(
                        "div.tab-pane",
                    );
                    return {
                        category: load(el)("a").text(),
                        manga: load(listupd.get(i))(".bs")
                            .map((_, el) => {
                                const bsx = load(el)(".bsx");

                                return {
                                    link: this.clearLink(
                                        bsx.children("a").attr("href"),
                                    ),
                                    image: bsx.find("img").attr("data-lazy-src")
                                        ? bsx.find("img").attr("data-lazy-src")
                                        : bsx.find("img").attr("src"),
                                    title: bsx.find(".tt").text(),
                                    totalChapter: bsx.find(".epxs").text(),
                                    type: bsx
                                        .find("span.type")
                                        .attr("class")
                                        .replace("type", "")
                                        .trim(),
                                    isColor: bsx
                                        .find("span")
                                        .hasClass("colored")
                                        ? true
                                        : false,
                                };
                            })
                            .get(),
                    };
                })
                .get();
        }

        return {
            link: this.clearLink(bsx.children("a").attr("href")),
            image: bsx.find("img").attr("data-lazy-src")
                ? bsx.find("img").attr("data-lazy-src")
                : bsx.find("img").attr("src"),
            title: bsx.find(".tt").text(),
            totalChapter: bsx.find(".epxs").text(),
            type: bsx
                .find("span.type")
                .attr("class")
                .replace("type", "")
                .trim(),
            isColor: bsx.find("span").hasClass("colored") ? true : false,
        };
    }

    private _home_utao($: cheerio.Cheerio, ch: cheerio.Root) {
        const imgu = $.find(".imgu"),
            luf = $.find(".luf");

        return {
            link: this.clearLink(imgu.children("a").attr("href")),
            image: imgu.children("a").children("img").attr("data-lazy-src")
                ? imgu.children("a").children("img").attr("data-lazy-src")
                : imgu.children("a").children("img").attr("src"),
            mType: imgu.find("span").attr("class"),
            type: luf.children("ul").attr("class"),
            title: luf.find("h4").text(),
            updateChap: luf
                .find("li")
                .map((_, el) => {
                    return {
                        link: this.clearLink(ch(el).children("a").attr("href")),
                        chapter: ch(el).children("a").text(),
                        updateAt: ch(el).children("span").text(),
                    };
                })
                .get(),
        };
    }

    private seriesBaru($: cheerio.Root) {
        const items = $("#sidebar").find(".serieslist");

        return $(items.get(3))
            .find("li")
            .map((_, el) => {
                return {
                    link: this.clearLink(
                        $(el).find(".imgseries").children("a").attr("href"),
                    ),
                    image: $(el)
                        .find(".imgseries")
                        .find("img")
                        .attr("data-lazy-src")
                        ? $(el)
                              .find(".imgseries")
                              .find("img")
                              .attr("data-lazy-src")
                        : $(el).find(".imgseries").find("img").attr("src"),
                    title: $(el).find(".leftseries").find("a.series").text(),
                    genre: $(el)
                        .find(".leftseries")
                        .find("span")
                        .find("a")
                        .map((_, el) => {
                            return $(el).text();
                        })
                        .get()
                        .join(", "),
                };
            })
            .get();
    }

    private serialPopuler($: cheerio.Root) {
        const items = $("#sidebar").find("#wpop-items").children("div");

        return {
            mingguan: $(items.get(0))
                .find("li")
                .map((_, el) => {
                    return {
                        link: this.clearLink(
                            $(el).find(".imgseries").children("a").attr("href"),
                        ),
                        image: $(el)
                            .find(".imgseries")
                            .find("img")
                            .attr("data-lazy-src")
                            ? $(el)
                                  .find(".imgseries")
                                  .find("img")
                                  .attr("data-lazy-src")
                            : $(el).find(".imgseries").find("img").attr("src"),
                        title: $(el)
                            .find(".leftseries")
                            .find("a.series")
                            .text(),
                        genre: $(el)
                            .find(".leftseries")
                            .find("span")
                            .find("a")
                            .map((_, el) => {
                                return $(el).text();
                            })
                            .get()
                            .join(", "),
                    };
                })
                .get(),
            bulanan: $(items.get(1))
                .find("li")
                .map((_, el) => {
                    return {
                        link: this.clearLink(
                            $(el).find(".imgseries").children("a").attr("href"),
                        ),
                        image: $(el)
                            .find(".imgseries")
                            .find("img")
                            .attr("data-lazy-src")
                            ? $(el)
                                  .find(".imgseries")
                                  .find("img")
                                  .attr("data-lazy-src")
                            : $(el).find(".imgseries").find("img").attr("src"),
                        title: $(el)
                            .find(".leftseries")
                            .find("a.series")
                            .text(),
                        genre: $(el)
                            .find(".leftseries")
                            .find("span")
                            .find("a")
                            .map((_, el) => {
                                return $(el).text();
                            })
                            .get()
                            .join(", "),
                    };
                })
                .get(),
            semua: $(items.get(2))
                .find("li")
                .map((_, el) => {
                    return {
                        link: this.clearLink(
                            $(el).find(".imgseries").children("a").attr("href"),
                        ),
                        image: $(el)
                            .find(".imgseries")
                            .find("img")
                            .attr("data-lazy-src")
                            ? $(el)
                                  .find(".imgseries")
                                  .find("img")
                                  .attr("data-lazy-src")
                            : $(el).find(".imgseries").find("img").attr("src"),
                        title: $(el)
                            .find(".leftseries")
                            .find("a.series")
                            .text(),
                        genre: $(el)
                            .find(".leftseries")
                            .find("span")
                            .find("a")
                            .map((_, el) => {
                                return $(el).text();
                            })
                            .get()
                            .join(", "),
                    };
                })
                .get(),
        };
    }
}
