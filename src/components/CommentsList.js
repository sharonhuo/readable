import React, { Component } from "react";
import { connect } from "react-redux";
import { changeCommentsSorting, createNewComment } from "../actions";
import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";
import _ from "lodash";
import { default as UUID } from "uuid";

class CommentsList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showAddCommentForm: false
    };
  }

  cancelCreateComment() {
    this.setState({ showAddCommentForm: false });
  }

  createComment(comment) {
    comment.id = UUID.v4();
    comment.parentId = this.props.currentPostId;
    this.props.createNewComment(comment);
    this.setState({ showAddCommentForm: false });
  }

  handleChange = (event) => {
    this.props.changeCommentsSorting(event.target.value, this.props.currentPostId);
  }

  renderHeader() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="title">
              <h6>all comments</h6>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <p className="h6">sort by
                <span>
                  <select onChange={this.handleChange}>
                    <option value="byScore">Score</option>
                    <option value="byTime">Time</option>
                  </select>
                </span>
              </p>
            </div>

            <div className="col">
              <button className="btn btn-primary btn-sm float-right"
                onClick={() => this.setState({ showAddCommentForm: true })}>
                Add a Comment
              </button>
            </div>
          </div>
          <hr />
        </div>
      </div>
    )
  }


  render() {
    const comments = this.props.posts[this.props.currentPostId].comments;
    return (
      <div>
        {this.renderHeader()}
        {this.state.showAddCommentForm &&
          <div className="row">
            <div className="offset-2 col-8">
              <CommentForm
                editingComment={
                  { body: "", 
                    author: "" 
                  }
                }
                onSubmit={this.createComment.bind(this)}
                onCancel={this.cancelCreateComment.bind(this)}
              />
            </div>
          </div>
        }

        {
          _.map(comments, comment => {
            return <CommentItem
              comment={comment}
              key={comment.id} />
          })
        }
      </div>
    )
  }
}

export default connect(null, { changeCommentsSorting, createNewComment })(CommentsList);


