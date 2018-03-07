import { ADD_ARTICLE } from './ArticleFormConstants';
import { DESELECT_ARTICLE } from '../ArticlesList/ArticlesListConstants';
import { Article } from '../../model/Article';

export const addArticle = (article: Article) => ({
    type: ADD_ARTICLE,
    payload: article
});

export const deselectArticle = (article: Article) => ({
    type: DESELECT_ARTICLE,
    payload: article
});