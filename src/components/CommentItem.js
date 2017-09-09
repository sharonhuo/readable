import React, { Component } from 'react';
import { connect } from "react-redux";
import { changeCommentsVotes, deleteCommentById, updateCurrentComment } from "../actions";
import ThumbsDownIcon from 'react-icons/lib/fa/thumbs-o-down';
import ThumbsUpIcon from 'react-icons/lib/fa/thumbs-o-up';
import EditIcon from 'react-icons/lib/fa/edit';
import DeleteIcon from 'react-icons/lib/md/delete'
import moment from "moment";
import CommentForm from "./CommentForm";

class CommentItem extends Component {

    /**
    * @description Represents a comment that used in comment list page
    * @param {body} body - Comment body
    * @param {string} authors - The authors of the comment
    * @param {string} voteScore	Integer	Net votes the post has received 
    */

    constructor(props) {
        super(props);
        this.state = { editing: false };
    }

    changeVotes = (direction) => {
        this.props.changeCommentsVotes(this.props.comment.id, direction);
    }

    onDeleteCommentClick() {
        this.props.deleteCommentById(this.props.comment.id);
    }

    editComment() {
        this.setState({ isEditing: true });
    }

    cancelEditingComment() {
        this.setState({ isEditing: false });
    }

    updateComment(comment) {
        this.props.updateCurrentComment(comment, )
        this.setState({ isEditing: false });
    }

    renderComment() {
        const { comment } = this.props;
        const { isEditing } = this.state;

        return (
            <div className="container" key={comment.id}>
                {isEditing && (
                    <CommentForm
                        editingComment={comment}
                        onSubmit={this.updateComment.bind(this)}
                        onCancel={this.cancelEditingComment.bind(this)}
                    />
                )}
                <p>
                    <small>
                        {comment.body}
                    </small>
                </p>
                <p className="h6">
                    <small>commented by {comment.author} on {moment(comment.timestamp).format("DD-MM-YYYY HH:mm:ss")}</small>
                </p>
                <p className="h6">
                    <span><small>Vote Score: {comment.voteScore}</small></span>
                    <span> </span>
                    <span><button onClick={() => this.changeVotes("upVote")} className='icon-btn'>
                        <ThumbsUpIcon size={20} />
                    </button></span>
                    <span> </span>
                    <span><button onClick={() => this.changeVotes("downVote")} className='icon-btn'>
                        <ThumbsDownIcon size={20} />
                    </button></span>
                </p>
                <p className="h6">
                    <span><button title="Edit comment" onClick={this.editComment.bind(this)} className='icon-btn'>
                        <EditIcon size={20} />
                    </button></span>
                    <span> </span>
                    <span><button title="Delete comment" onClick={this.onDeleteCommentClick.bind(this)} className='icon-btn'>
                        <DeleteIcon size={20} />
                    </button></span>
                </p>

                <hr />
            </div>
        );
    }

    render() {
        return (
            <div>
                {this.renderComment()}
            </div>
        );
    }
}

export default connect(null, { changeCommentsVotes, deleteCommentById, updateCurrentComment })(CommentItem);



