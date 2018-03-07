import {ADD_ARTICLE} from "./ArticleFormConstants";

const articleFormReducer = (state = [], action) => {
    switch (action.type) {
        case ADD_ARTICLE:
            return [...state.filter(ar => ar.id !== action.payload.id), action.payload];
        default:
            return state;
    }
};

export default articleFormReducer;
