export interface ArticleAction {
    type: string;
    payload: Article;
}

export interface Article {
    id?: string;
    title: string;
    description: string;
}

export const EMPTY_ARTICLE: Article = { title: '', description: '' };