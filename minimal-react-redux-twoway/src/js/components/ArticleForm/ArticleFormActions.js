import { ADD_ARTICLE } from './ArticleFormConstants'
import { DESELECT_ARTICLE } from '../ArticlesList/ArticlesListConstants'

export const addArticle = article => ({
    type: ADD_ARTICLE,
    payload: article
});

export const deselectArticle = article => ({
    type: DESELECT_ARTICLE,
    payload: article
});