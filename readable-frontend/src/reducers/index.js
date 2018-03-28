import { combineReducers } from 'redux'
import PostsReducer from './reducer-posts'
import CategoriesReducer from './reducer-categories'
import CommentsReducer from './reducer-comments'
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
  posts : PostsReducer,
  comments: CommentsReducer,
  categories: CategoriesReducer,
  form : formReducer
});

export default rootReducer;
