import React, { Component } from "react";
import { connect } from "react-redux";
import { getPostById, deletePostById } from "../actions";
import CommentsList from "./CommentsList";
import PostList from "./PostList";
import _ from "lodash";

class PostDetailView extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getPostById(id);
  }

  onDeleteClick() {
    const { id } = this.props.match.params;
    this.props.deletePostById(id);
  }

  renderComments() {
    const { posts } = this.props;
    const post = posts[this.props.match.params.id]

    return (
      <div className="container">
        <CommentsList
          posts={posts}
          currentPostId={post.id}
        />
      </div>
    )
  }

  render() {
    const { posts } = this.props;
    const { id } = this.props.match.params;
    let post = posts[id];

    if (post === undefined) {
      return (
        <div className="container">
          <br />
          <br />
          <br />
          <div className="row">
            <div className="title">
              <h5>Post has been deleted</h5>
            </div>
          </div>
        </div>)
    }

    if (!post) {
      return <div>Loading...</div>;
    }

    post = _.mapKeys([post], "id");
    return (
      <div>
        <div className="container">
          <br />
          <br />
          <br />
          <div className="col">
            <button
              className="btn btn-primary btn-sm float-right"
              onClick={this.onDeleteClick.bind(this)}
            >
              Delete Post
            </button>
          </div>
        </div>

        <PostList 
          postList={post} 
          isDetailsView={true}
        />

        {this.renderComments()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts
  }
}

export default connect(mapStateToProps, { getPostById, deletePostById })(PostDetailView);
