export interface OtakudesuQuery {
    page?: number;
    type?: "ongoing" | "complete";
    search?: string;
}

export interface OtakudesuMirrorStream {
    mirror360?: string;
    mirror480?: string;
    mirror720?: string;
    useEmbed?: boolean;
}

export interface OtakudesuDownloadType extends OtakudesuMirrorStream {
    type?: "zippyshare" | "racaty" | "filesim" | "desucloud";
    resolution?: string;
    file?: "mkv" | "mp4";
}

export interface DownloadLink {
    prov: string;
    link: string;
}

export interface StreamData {
    resolusi: string;
    downloadLink: DownloadLink[];
    ukuran: string;
}
