import React, { Component } from "react";
import { connect } from "react-redux";
import { getPostsByCat } from "../actions";
import PostList from "./PostList";

class PostListByCategoryView extends Component {

  componentDidMount() {
    const { category } = this.props.match.params;
    this.props.getPostsByCat(category);
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.match.params.category !== this.props.match.params.category) {
      this.props.getPostsByCat(nextProps.match.params.category);
    }
  }

  renderHeader() {
    const { category } = this.props.match.params;
    return (
      <div className="well">
        <br />
        <br />
        <br />
        <div className="container">
          <div className="row">
            <div className="title">
              <h6>Posts for {category}</h6>
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const { posts } = this.props;
    return (
      <div className="app">
        {this.renderHeader()}
        <PostList postList={posts} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { posts: state.posts };
}

export default connect(mapStateToProps, { getPostsByCat })(PostListByCategoryView);
