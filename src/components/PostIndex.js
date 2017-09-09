import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllPosts } from "../actions";
import PostList from "./PostList";

class PostIndex extends Component {

    componentDidMount() {
        this.props.getAllPosts();
    }

    renderHeader() {
        return (
            <div className="well">
                <br />
                <br />
                <br />
                <div className="container">
                    <div className="row">
                        <div className="title">
                            <h6>Posts Index</h6>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        const posts = this.props.posts;
        return (
            <div>
                {this.renderHeader()}
                <PostList 
                    postList={posts}
                    isDetailsView={false}
                />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        posts: state.posts
    };
}

export default connect(mapStateToProps, { getAllPosts })(PostIndex);


