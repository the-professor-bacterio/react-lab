import React, { Component } from "react";
import { connect } from "react-redux";
import ArticlesListView from "./ArticlesListView";
import {showArticle} from "./ArticlesListActions";
import PropTypes from "prop-types";

class ArticlesList extends Component {
    constructor(props) {
        super(props);
        this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleOnClick(event) {
        let id = event.target.id;
        this.props.showArticle(id);
    }

    render() {
        return (
            <ArticlesListView
                articles={this.props.articles}
                onClick={this.handleOnClick}
            />
        );
    }
}

ArticlesList.propTypes = {
    showArticle: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
    return {
        showArticle: (article) => dispatch(showArticle(article))
    };
};

const mapStateToProps = (state) => {
    return { articles: state.articles };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesList);

