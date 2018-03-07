import { SHOW_ARTICLE } from './ArticlesListConstants'

export const showArticle = articleId => ({
    type: SHOW_ARTICLE,
    payload: articleId
});