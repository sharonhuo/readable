import { fetchAllPosts } from '../utils/api';
import { fetchAllCommentsByPostId } from '../utils/api';
import { fetchPostsByCategory } from '../utils/api';
import { postVotes } from '../utils/api';
import { commentVotes } from '../utils/api';
import { fetchPostById } from '../utils/api';
import { deletePost } from '../utils/api';
import { deleteComment } from '../utils/api';
import { createPost } from '../utils/api';
import { updatePost } from '../utils/api';
import { createComment } from '../utils/api';
import { updateComment } from '../utils/api';

export const FETCH_POSTS = "fetch_posts";
export const FETCH_POST = "fetch_post";
export const CREATE_POST = "create_post";
export const DELETE_POST = "delete_post";
export const UPDATE_POST = "update_post";
export const FETCH_POSTS_COMMENT = "fetch_posts_comments";
export const FETCH_POST_BY_CAT = "fetch_post_by_cat";
export const CHANGE_SORT = "change_sort";
export const CHANGE_VOTES = "change_votes";
export const CHANGE_COMMENT_SORT = "change_comment_sort";
export const CHANGE_COMMENT_VOTE = "change_comment_vote";
export const DELETE_COMMENT = "delete_comment";
export const CREATE_COMMENT = "create_comment";
export const UPDATE_COMMENT = "update_comment";


export const getAllPosts = () => {
  return dispatch => {
    fetchAllPosts()
      .then(res => {
        dispatch({ type: FETCH_POSTS, payload: res });
        res.map(post => {
          return dispatch(getAllCommentsById(post.id));
        });
      })
      .catch(error => { throw (error) })
  };
};

export const getPostById = (id) => {
  return dispatch => {
    fetchPostById(id)
      .then(res => {
        dispatch({ type: FETCH_POST, payload: res });
        dispatch(getAllCommentsById(id));
      })
      .catch(error => { throw (error) })
  };
};

export const getAllCommentsById = id => {
  return dispatch => {
    fetchAllCommentsByPostId(id)
      .then(response => {
        dispatch({
          type: FETCH_POSTS_COMMENT,
          payload: {
            id: id,
            comments: response
          }
        });
      })
      .catch(error => { throw (error) })
  };
};


/* function loadCommentsSuccess(payload) {
  return {
    type: FETCH_POSTS_COMMENT,
    payload
  }
}
 */
export const getPostsByCat = (name) => {
  return dispatch => {
    fetchPostsByCategory(name)
      .then(res => {
        dispatch({ type: FETCH_POST_BY_CAT, payload: res });
        res.map(post => {
          return dispatch(getAllCommentsById(post.id));
        });
      })
      .catch(error => { throw (error) })
  };
};



export function changeSorting(sortBy) {
  return {
    type: CHANGE_SORT,
    sortBy
  }
}

export const changeVotes = (id, direction) => dispatch => (
  postVotes(id, direction)
    .then(votes => dispatch(postChangeVotesSuccess(votes)))
)

export function postChangeVotesSuccess(payload) {
  return {
    type: CHANGE_VOTES,
    payload
  }
}


export function changeCommentsSorting(sortBy, currentPostId) {
  return {
    type: CHANGE_COMMENT_SORT,
    sortBy,
    currentPostId
  }
}

export const changeCommentsVotes = (id, direction) => dispatch => (
  commentVotes(id, direction)
    .then(votes => dispatch(commentChangeVotesSuccess(votes)))
)

export function commentChangeVotesSuccess(payload) {
  return {
    type: CHANGE_COMMENT_VOTE,
    payload
  }
}

export const deletePostById = (id) => dispatch => (
  deletePost(id).then(() => {
    dispatch({ id: id, type: DELETE_POST })
  }))


export const deleteCommentById = id => {
  return dispatch => {
    deleteComment(id)
      .then(response => {
        dispatch({ type: DELETE_COMMENT, payload: response })
      })
      .catch(error => { throw (error) })
  }
};

 //A working example of how to make callback funcation
 //Caller : 
 /*     this.props.deletePostById(id, () => {
         this.props.history.push("/");
        }); 
 export const deletePostById = (id, callback) => dispatch => (
  deletePost(id).then(() => {
    dispatch({ id: id, type: DELETE_POST });
    callback()
  }))
 */

export const createNewPost = (values , currentCategory)=> {
  return dispatch => {
    createPost(values)
      .then(response => {
        dispatch({ type: CREATE_POST, 
          payload: response,
          currentCategory: currentCategory
        })
      })
      .catch(error => { throw (error) })
  }
};

export const updateCurrentPost = post => {
  return dispatch => {
    updatePost(post)
      .then(response => {
        dispatch({ type: UPDATE_POST, payload: response })
      })
      .catch(error => { throw (error) })
  }
};

export const createNewComment = (values)=> {
  return dispatch => {
    createComment(values)
      .then(response => {
        dispatch({ type: CREATE_COMMENT, 
          payload: response
        })
      })
      .catch(error => { throw (error) })
  }
};

export const updateCurrentComment = comment => {
  return dispatch => {
    updateComment(comment)
      .then(response => {
        dispatch({ type: UPDATE_COMMENT, payload: response })
      })
      .catch(error => { throw (error) })
  }
};

