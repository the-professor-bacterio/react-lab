import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import uuidv1 from "uuid";
import ArticleFormView from "./ArticleFormView"
import {addArticle, deselectArticle} from "./ArticleFormActions";


class ArticleForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: undefined,
            title: "",
            description: ""

        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        let id = this.props.selectedArticle.id;
        this.setState({id: id, [event.target.id]: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        const {title, description} = this.state;
        const id = this.props.selectedArticle.id || uuidv1();
        this.props.deselectArticle({});
        this.props.addArticle({id, title, description});

        this.setState({id: undefined, title: "", description: ""});
    }

    componentWillReceiveProps(newProps) {
        const id = newProps.selectedArticle.id;
        if (id) {
            const selectedArticle = this.props.articles.find(ar => ar.id === id);
            this.setState({id: id, title: selectedArticle.title, description: selectedArticle.description});
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

ArticleForm.propTypes = {
    addArticle: PropTypes.func.isRequired,
    deselectArticle: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
    return {
        addArticle: (article) => dispatch(addArticle(article)),
        deselectArticle: (article) => dispatch(deselectArticle(article))
    };
};

const mapStateToProps = (state) => {
    return {
        articles: state.articles,
        selectedArticle: state.selectedArticle
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleForm);
