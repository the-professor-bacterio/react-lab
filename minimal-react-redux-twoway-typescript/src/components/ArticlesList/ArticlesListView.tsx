import * as React from 'react';
import { Article } from '../../model/Article';

interface ArticlesListViewProps {
    articles: Article[];
    onClick: (event: any) => void;
}

const ArticlesListView = (props: ArticlesListViewProps) => {
    return (
        <ul className="list-group list-group-flush">
            {props.articles.map((a: Article) => { return (
                <li
                    className="list-group-item"
                    key={a.id}
                    id={a.id}
                    onClick={props.onClick}
                >
                {a.title} {a.description}
                </li>);
            })}
        </ul>
    );
};

export default ArticlesListView;