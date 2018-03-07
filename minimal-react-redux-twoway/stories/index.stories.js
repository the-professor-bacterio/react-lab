import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';
import Nice from './Nice'

import ArticleFormView from '../src/js/components/ArticleForm/ArticleFormView'
import ArticlesListView from '../src/js/components/ArticlesList/ArticlesListView'

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>);

storiesOf('ArticleForm', module)
    .add('with data', () =>
        <Nice
            title={"Add new article Form"}
            styles={"col-md-5 offset-md-1"}
        >
            <ArticleFormView
                title={"hello"}
                onSubmit={action('submit')}
                onChange={action("change")}
            />
        </Nice>
    );

storiesOf('ArticlesListView', module)
    .add('with data', () =>
        <Nice
            title={"Show List of articles"}
            styles={"col-md-5 offset-md-1 border:1px solid black"}
        >
            <ArticlesListView
                articles={[{id:1, title: "article 1"}, {id:2, title: "article 2"}]}
            />
        </Nice>
    );