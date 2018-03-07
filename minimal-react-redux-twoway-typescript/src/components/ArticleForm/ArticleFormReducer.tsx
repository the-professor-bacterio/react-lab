import { ADD_ARTICLE } from './ArticleFormConstants';
import { Article, ArticleAction } from '../../model/Article';

const articleFormReducer = (state: Article[] = [], action: ArticleAction) => {
    switch (action.type) {
        case ADD_ARTICLE:
            return [...state.filter(ar => ar.id !== action.payload.id), action.payload];
        default:
            return state;
    }
};

export default articleFormReducer;
