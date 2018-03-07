import {SHOW_ARTICLE, DESELECT_ARTICLE} from "./ArticlesListConstants";

const articlesListReducer = (state = {title: "", description: ""}, action) => {
    switch (action.type) {
        case SHOW_ARTICLE:
            return {
                id: action.payload,
                title: state.title,
                description: state.description
            };
            
        case DESELECT_ARTICLE:
            return {
                id: undefined,
                title: "",
                description: ""
            };
        default:
            return state;
    }
};

export default articlesListReducer;
