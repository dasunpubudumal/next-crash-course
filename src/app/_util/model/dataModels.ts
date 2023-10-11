import exp from "constants";

export interface TopNews {
    status: string;
    totalResults: number;
    articles: Article[];
}

export interface Article { 
    source: Source;
    title: string;
    author: string;
    description: string;
    publishedAt: string
    content: string;
    urlToImage: string;
    url: string;
}

export interface Source {
    id: string;
    name: string;
}