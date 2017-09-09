import _ from "lodash";
import {
  FETCH_POSTS, FETCH_POST, DELETE_POST, CREATE_POST, UPDATE_POST,
  FETCH_POSTS_COMMENT, FETCH_POST_BY_CAT, CHANGE_SORT, CHANGE_VOTES,
  CHANGE_COMMENT_VOTE, CHANGE_COMMENT_SORT, DELETE_COMMENT,
  CREATE_COMMENT, UPDATE_COMMENT
} from "../actions";

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_POSTS:
      const allPosts = action.payload.filter((post) => !post.deleted);
      //Normalizing data
      return _.mapKeys(_.orderBy(allPosts, 'voteScore', 'desc'), "id");
    case FETCH_POST_BY_CAT:
      return _.mapKeys(_.orderBy(action.payload, 'voteScore', 'desc'), "id");
    case CHANGE_SORT:
      const postSortBy = action.sortBy;
      if (postSortBy === 'byTime') {
        return _.mapKeys(_.orderBy(state, 'timestamp', 'desc'), "id");
      }
      if (postSortBy === 'byScore') {
        return _.mapKeys(_.orderBy(state, 'voteScore', 'desc'), "id");
      }
      return _.mapKeys(_.orderBy(state, 'voteScore', 'desc'), "id");
    case CHANGE_VOTES:
      const currentChangeVotePostId = action.payload.id;
      let newList = { ...state };
      const currentChangeVotePost = newList[currentChangeVotePostId];
      newList = _.map(currentChangeVotePost !== undefined ? state : _.mapKeys([newList], "id"),
        post => {
          if (post.id === action.payload.id) {
            return { ...post, voteScore: action.payload.voteScore };
          }
          return { ...post };
        });
      return _.mapKeys(newList, "id");
    case FETCH_POST:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_POST:
      return _.omit(state, action.id);
    case FETCH_POSTS_COMMENT:
      const postId = action.payload.id;
      const newPost = _.map(state, post => {
        if (post.id === postId) {
          return { ...post, comments: action.payload.comments };
        }
        return { ...post };
      });
      return _.mapKeys(_.orderBy(newPost, 'voteScore', 'desc'), "id");
    case CHANGE_COMMENT_VOTE:
      const currentPostId = action.payload.parentId;
      let currentPost = state[currentPostId] !== undefined ? state[currentPostId] : _.mapKeys([state], "id");
      const newCommentList = _.map(currentPost.comments, comment => {
        if (comment.id === action.payload.id) {
          return { ...comment, voteScore: action.payload.voteScore };
        }
        return { ...comment };
      });
      currentPost.comments = newCommentList;
      return _.mapKeys([currentPost], "id");
    case CHANGE_COMMENT_SORT:
      const { sortBy } = action;
      let currentSortPostId = action.currentPostId;
      const currentSortPost = state[currentSortPostId] !== undefined ? state[currentSortPostId] : _.mapKeys([state], "id");
      const newSortCommentList = sortBy === 'byTime' ? _.orderBy(currentSortPost.comments, 'timestamp', 'desc')
        : _.orderBy(currentSortPost.comments, 'voteScore', 'desc');
      currentSortPost.comments = newSortCommentList;
      return _.mapKeys([currentSortPost], "id");
    case DELETE_COMMENT:
      let currentDelCommentPost = state[action.payload.parentId];
      const afterDelCommentList = currentDelCommentPost.comments.filter((comment) => comment.id !== action.payload.id);
      currentDelCommentPost.comments = afterDelCommentList;
      return _.mapKeys([currentDelCommentPost], "id");
    case CREATE_POST:
      let posts = Object.assign({}, state);
      if (
        action.currentCategory === undefined || action.currentCategory === action.payload.category
      ) {
        posts[action.payload.id] = action.payload;
      }
      return posts;
    case UPDATE_POST:
      const updatedList = _.map(state, function (a) {
        return a.id === action.payload.id ? action.payload : a;
      });
      return _.mapKeys(updatedList, "id");
    case CREATE_COMMENT:
      const currPost = state[action.payload.parentId];
      const currComms = currPost.comments;
      const newComms = [action.payload, ...currComms];
      currPost.comments = newComms;
      return _.mapKeys([currPost], "id");
    case UPDATE_COMMENT:
      const currEditingCommPostId = action.payload.parentId;
      let currEditingCommPost = state[currEditingCommPostId];
      const currPostComments = currEditingCommPost.comments;
      var i = currPostComments.findIndex(o => o.id === action.payload.id);
      if (currPostComments[i]) {
        currPostComments[i] = action.payload
      } else {
        currPostComments.push(action.payload)
      };
      let updatedPost = {
        ...currEditingCommPost,
        comments: currPostComments
      }
      return _.mapKeys([updatedPost], "id");
    default:
      return state;
  }
}
