import { combineReducers } from 'redux';
import articleFormReducer from '../components/ArticleForm/ArticleFormReducer';
import articlesListReducer from '../components/ArticlesList/ArticlesListReducer';

// here every component has the state identified by a key, "articles" in this case
export default combineReducers({
    articles: articleFormReducer,
    selectedArticle: articlesListReducer
});
