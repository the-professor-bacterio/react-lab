import React from "react";
import PropTypes from "prop-types";

const ArticleFormView = ({ id, title, description, onSubmit, onChange }) => (
  <form onSubmit={onSubmit}>
    <div className="form-group">
      <label htmlFor="title">Article Title</label>
      <input
        type="text"
        className="form-control"
        id="title"
        value={title}
        onChange={onChange}
      />
        <label htmlFor="title">Article Description</label>
        <input
            type="text"
            className="form-control"
            id="description"
            value={description}
            onChange={onChange}
        />
    </div>
    <button type="submit" className="btn btn-success btn-lg">
      SAVE
    </button>
  </form>
);

ArticleFormView.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired
};

export default ArticleFormView;
