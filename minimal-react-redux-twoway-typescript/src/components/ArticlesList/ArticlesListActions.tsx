import { SHOW_ARTICLE } from './ArticlesListConstants';

export const showArticle = (articleId: string) => ({
    type: SHOW_ARTICLE,
    payload: articleId
});