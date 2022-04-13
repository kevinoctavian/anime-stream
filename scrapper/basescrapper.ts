import axios, { AxiosProxyConfig, AxiosRequestHeaders } from "axios";

export class BaseScrapper {
    private _link: string;
    protected body: any;

    private header: AxiosRequestHeaders = {
        "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36",
    };

    constructor(link: string, option?: AxiosRequestHeaders) {
        this._link = link;
        this.header = { ...this.header, ...option };
    }

    get link() {
        return this._link;
    }

    protected async request(route: string): Promise<void> {
        console.log(this._link + route);
        const { data, headers } = await axios.get(this._link + route, {
            headers: this.header,
        });
        // console.log(headers);

        this.body = await data;
    }

    protected async post(route: string, data: any): Promise<void> {
        console.log(this._link + route);
        const ax = await axios.post(this._link + route, data, {
            headers: this.header,
        });
        // console.log(headers);

        this.body = await ax.data;
    }
}
