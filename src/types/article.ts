// /src/types/article.ts

/**
 * Defines the structure for a raw news article object.
 */
export interface RawArticle {
    id: string;
    title: string;
    content: string; // The full text content
    url: string;
}