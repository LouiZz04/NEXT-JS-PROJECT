export type Imagee = {
    total: number;
    totalHits: number;
    hits: {
        id: number;
        pageURL: string;
        tags: string;
        previewURL: string;
        largeImageURL: string;
        imageWidth: number;
        imageHeight: number;
    }[];
};

export type Video = {
    total: number;
    totalHits: number;
    hits:
    {
        id: number;
        pageURL: string;
        tags: string;
        videos: {
            large: {
                url: string;
                width: number;
                height: number;
            },
        },
        userImageURL: string;
    }[],
}

export type Media = Imagee | Video;