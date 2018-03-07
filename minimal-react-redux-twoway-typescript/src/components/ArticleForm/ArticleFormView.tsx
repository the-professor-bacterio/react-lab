import * as React from 'react';

interface ArticleFormViewProps {
    id?: string;
    title: string;
    description: string;
    onSubmit: (event: any) => void;
    onChange: (event: any) => void;
}

const ArticleFormView = (props: ArticleFormViewProps) => (
  <form onSubmit={props.onSubmit}>
    <div className="form-group">
      <label htmlFor="title">Article Title</label>
      <input
        type="text"
        className="form-control"
        id="title"
        value={props.title}
        onChange={props.onChange}
      />
        <label htmlFor="title">Article Description</label>
        <input
            type="text"
            className="form-control"
            id="description"
            value={props.description}
            onChange={props.onChange}
        />
    </div>
    <button type="submit" className="btn btn-success btn-lg">
      SAVE
    </button>
  </form>
);

export default ArticleFormView;
