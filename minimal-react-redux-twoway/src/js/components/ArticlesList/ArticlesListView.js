import React from "react";
import PropTypes from "prop-types";

const ArticlesListView = ({ articles, onClick }) => (
  <ul className="list-group list-group-flush">
     <For each="article" of={articles}>
          <li
              className="list-group-item"
              key={article.id}
              id={article.id}
              onClick={onClick}
          >
            {article.title} {article.description}
          </li>
    </For>
  </ul>
);

ArticlesListView.propTypes = {
    articles: PropTypes.array.isRequired,
    onClick: PropTypes.func
};

export default ArticlesListView