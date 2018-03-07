import { SHOW_ARTICLE, DESELECT_ARTICLE } from './ArticlesListConstants';
import { Article, ArticleAction, EMPTY_ARTICLE } from '../../model/Article';

const articlesListReducer = (state: Article = EMPTY_ARTICLE, action: ArticleAction) => {
    switch (action.type) {
        case SHOW_ARTICLE:
            return {
                id: action.payload,
                title: state.title,
                description: state.description
            };
            
        case DESELECT_ARTICLE:
            return EMPTY_ARTICLE;
        default:
            return state;
    }
};

export default articlesListReducer;
