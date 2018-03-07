import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { v1 as uuidv1 }  from 'uuid';
import { Article, EMPTY_ARTICLE } from '../../model/Article';
import ArticleFormView from './ArticleFormView';
import { addArticle, deselectArticle } from './ArticleFormActions';

interface ArticleFormProperties {
    articles?: Article[];
    selectedArticle?: Article;
    addArticle?: (article: Article) => void;
    deselectArticle?: (article?: Article) => void;
}

class ArticleForm extends Component<ArticleFormProperties, Article> {
    constructor(props: ArticleFormProperties) {
        super(props);

        this.state = {
            id: undefined,
            title: '',
            description: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event: any) {
        let id = this.props.selectedArticle != null ? this.props.selectedArticle.id : undefined;
        this.setState({id: id, [event.target.id]: event.target.value});
    }

    handleSubmit(event: any) {
        event.preventDefault();
        const {title, description} = this.state;
        const id = this.props.selectedArticle != null ? this.props.selectedArticle.id || uuidv1() : uuidv1();
        if (this.props.deselectArticle) { this.props.deselectArticle(EMPTY_ARTICLE); }
        if (this.props.addArticle) { this.props.addArticle({id, title, description}); }

        this.setState(EMPTY_ARTICLE);
    }

    componentWillReceiveProps(newProps: ArticleFormProperties) {
        if (newProps.selectedArticle) {
            const id = newProps.selectedArticle != null ? newProps.selectedArticle.id : undefined;
            if (id) {
                if (this.props.articles) {
                    const selectedArticle = this.props.articles.find(ar => ar.id === id);
                    if (selectedArticle) {
                        this.setState({id: id, title: selectedArticle.title, description: selectedArticle.description});
                    }
                }
            }
        }
    }

    render() {
        const {title, description} = this.state;
        return (
            <ArticleFormView
                title={title}
                description={description}
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}
            />
        );
    }
}

const mapDispatchToProps = (dispatch: any): any => {
    return {
        addArticle: (article: Article) => dispatch(addArticle(article)),
        deselectArticle: (article: any) => dispatch(deselectArticle(article))
    };
};

const mapStateToProps = (state: any): any => {
    return {
        articles: state.articles,
        selectedArticle: state.selectedArticle
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleForm);
