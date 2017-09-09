import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getAllPosts } from "../actions";
import { changeSorting } from "../actions";
import PostItem from "./PostItem";
import PostForm from "./PostForm";
import { createNewPost, updateCurrentPost } from "../actions";
import _ from "lodash";
import { default as UUID } from "uuid";


class PostList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      newPost: {}
    };
    this.togglePostEditor = this.togglePostEditor.bind(this);
  }

  togglePostEditor() {
    this.setState({
      isPostEditorOpen: !this.state.isPostEditorOpen
    });
  }

  componentDidMount() {
    this.props.getAllPosts();
  }

  handleChange = (event) => {
    this.props.changeSorting(event.target.value);
  }

  onAddPostClick() {
    this.setState(
      {
        newPost: {
          isNewCategory: false,
          category: "",
          title: "",
          body: "",
          author: ""
        }
      },
      () => {
        this.togglePostEditor();
      }
    );
  }  

  savePost(post) {
    //adding new post
    if (post.id === undefined) {
      post.id = UUID.v4();
      this.props.createNewPost(post, this.props.match.params.category);
    } else {
      this.props.updateCurrentPost(post);
    }
    this.togglePostEditor();
  }

  editPost(post) {
    this.setState(
      {
        newPost: post
      },
      () => {
        this.togglePostEditor();
      }
    );
  }

  addNewPost() {
    this.setState(
      {
        newPost: {
          title: "",
          category: "",
          body: "",
          author: ""
        }
      },
      () => {
        this.togglePostEditor();
      }
    );
  }

  renderHeader() {
    const { isDetailsView } = this.props;
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col">
              {!isDetailsView && 
              <p className="h6">sort by
                <span>
                  <select onChange={this.handleChange}>
                    <option value="byScore">Score</option>
                    <option value="byTime">Time</option>
                  </select>
                </span>
              </p>
              }

              {isDetailsView &&
              <p> </p>
              }
            </div>

            {!isDetailsView &&
              <div className="col">
                <button className="btn btn-primary btn-sm float-right" onClick={this.onAddPostClick.bind(this)}>
                  Add a Post
              </button>
              </div>
            }
          </div>
          <hr />
        </div>
      </div>
    )
  }

  render() {
    const { postList, isDetailsView } = this.props;
    const posts = postList;
    return (
      <div>
        {this.renderHeader()}
        {
          _.map(posts, post => {
            return <PostItem
              post={post}
              key={post.id}
              isDetailsView={isDetailsView}
              editAction={() => this.editPost(post)} />
          })
        }

        <PostForm
          isOpen={this.state.isPostEditorOpen}
          toggle={this.togglePostEditor}
          newPost={this.state.newPost}
          onSubmit={post => this.savePost(post)}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
  };
}

export default withRouter(connect(mapStateToProps, {
  getAllPosts, changeSorting,
  createNewPost, updateCurrentPost
})(PostList));


