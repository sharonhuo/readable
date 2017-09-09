import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { changeVotes, deletePostById } from "../actions";
import ThumbsDownIcon from 'react-icons/lib/fa/thumbs-o-down';
import ThumbsUpIcon from 'react-icons/lib/fa/thumbs-o-up';
import moment from "moment";
import EditIcon from 'react-icons/lib/fa/edit';
import DeleteIcon from 'react-icons/lib/md/delete';

class PostItem extends Component {

    /**
    * @description Represents a post that used in post list page
    * @param {string} title - The title of the post
    * @param {string} authors - The authors of the post
    * @param {string} body - The content of the post
    * @param {string} vote - The voting score
    */

    changeVotes = (direction) => {
        const posts = this.props.posts;
        const post = posts === undefined ? this.props.post : posts[this.props.id];
        this.props.changeVotes(post.id, direction);
    }

    onDeletePostClick() {
        this.props.deletePostById(this.props.post.id);
    }

    renderPost() {
        const posts = this.props.posts;
        const post = posts === undefined ? this.props.post : posts[this.props.id];
        const { isDetailsView } = this.props;
        return (
            <div className="container" key={post.id}>
                {!isDetailsView &&
                    <p className="h6">
                        <Link to={`/${post.category}/${post.id}`}>
                            {post.title}
                        </Link>
                    </p>
                }
                {isDetailsView &&
                    <p className="h6">
                        {post.title}
                    </p>
                }

                <p><small>
                    {post.body}
                </small></p>

                <p className="h6">
                    <small>Category: {post.category}</small>
                </p>

                <p className="h6">
                    <small>Posted by {post.author} on {moment(post.timestamp).format("DD-MM-YYYY HH:mm:ss")}</small>
                </p>

                <p className="h6">
                    <span><small>Vote Score: {post.voteScore}</small></span>
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
                    <small>{(post.comments !== undefined && post.comments.length) > 0 ?
                        `${post.comments.length} comments` :
                        (post.comments !== undefined ? '0 comments' : '')}</small>
                </p>

                <p className="h6">
                    <span><button title="Edit post" onClick={() => this.props.editAction()} className='icon-btn'>
                        <EditIcon size={20} />
                    </button></span>
                    <span> </span>
                    <span><button title="Delete post" onClick={this.onDeletePostClick.bind(this)} className='icon-btn'>
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
                {
                    this.renderPost()
                }

            </div>
        );
    }
}

function mapStateToProps(state) {
    return { comments: state.comments };
}

export default connect(mapStateToProps, { changeVotes, deletePostById })(PostItem);



