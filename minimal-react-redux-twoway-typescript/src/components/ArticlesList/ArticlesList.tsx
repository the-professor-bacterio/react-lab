import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import ArticlesListView from './ArticlesListView';
import { showArticle } from './ArticlesListActions';
import { Article } from '../../model/Article';

interface ArticleListProperties {
    articles: Article[];
    handleOnClick?: (event: any) => void;
    showArticle?: (id: string) => any;
}

class ArticlesList extends Component<ArticleListProperties, any> {
    constructor(props: ArticleListProperties) {
        super(props);
        this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleOnClick(event: any) {
        let id = event.target.id;
        if (this.props.showArticle) { this.props.showArticle(id); }
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

const mapDispatchToProps = (dispatch: any): any =>  {
    return {
        showArticle: (articleId: string) => dispatch(showArticle(articleId))
    };
};

const mapStateToProps = (state: any): any => {
    return { articles: state.articles };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesList);