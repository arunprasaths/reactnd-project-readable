import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import { Provider } from 'react-redux';

import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import rootReducer from "./reducers";

import PostListPage from './containers/post-list-page'
import PostFormPage from './containers/post-form-page'
import PostShow from './containers/post-show-page'
import CommentEditPage from './containers/comment-edit-page'

import NoMatch from  './components/no-match'

import './index.css';
import registerServiceWorker from './registerServiceWorker';

const middleware = applyMiddleware(promise(), thunk);
const store = createStore(rootReducer, middleware);

ReactDOM.render(    
     <Provider store={store}>
       <BrowserRouter>
            <div> 
                <Switch>                 
                    <Route path="/" exact component={PostListPage} />                 
                    <Route path="/posts/new" component={PostFormPage} />
                    <Route path="/:category" exact component={PostListPage} />
                    <Route path="/:category/:id" exact component={PostShow} />  
                    <Route path="/posts/edit/:id" component={PostFormPage} />
                    <Route path="/:category/:postId/comments/edit/:id" component={CommentEditPage} />
                    <Route component={NoMatch} />
                </Switch>
            </div>
       </BrowserRouter>
     </Provider>
    ,document.getElementById('root'));
registerServiceWorker();
