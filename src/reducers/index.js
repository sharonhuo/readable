import { combineReducers } from "redux";
import postsReducer from "./postListReducer";
import categoryReducer from "./categoryReducer";

const rootReducer = combineReducers({
  categories: categoryReducer,
  posts: postsReducer
});

export default rootReducer;
