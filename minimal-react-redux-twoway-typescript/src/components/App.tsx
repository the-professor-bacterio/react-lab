import * as React from 'react';

import ArticlesList from './ArticlesList/ArticlesList';
import ArticleForm from './ArticleForm/ArticleForm';

const App = () => {
    return (
        <html lang="en">
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"/>
            <title>A minimal React Two way with javascript</title>
        </head>
        <body>
        <div className="container" id="app">
            <h3>A minimal React Webpack configuration! Check out the console with F12</h3>
            <div className="row mt-5">
                <div className="col-md-4 offset-md-1">
                    <h2>Articles</h2>
                    <ArticlesList articles={[]}/>
                </div>
                <div className="col-md-4 offset-md-1">
                    <h2>Add a new article</h2>
                    <ArticleForm/>
                </div>
            </div>
        </div>
        </body>
        </html>
    );
};

export default App;
