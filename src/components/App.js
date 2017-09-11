
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './Header';
import PostIndex from './PostIndex';
import PostListByCategoryView from './PostListByCategoryView';
import PageNotFound from './PageNotFound';
import PostDetailView from "./PostDetailView";
import { getAllCategories } from "../actions/category.action";
import './App.css';

class App extends Component {

  componentDidMount() { 
    this.props.getAllCategories();
  }

  render() {
    return (
      <div className="mainContainer">
        <Header />
        <div className="container posts-container">
          <Switch location={this.props.location}>
            <Route exact path="/:category/:id" component={PostDetailView} />
            <Route exact path="/:category" component={PostListByCategoryView} />
            <Route exact path="/" component={PostIndex} />
            {/* This only works when the URL has three levels */}
            <Route path="*" component={PageNotFound} />
          </Switch>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllCategories: () => dispatch(getAllCategories())
  };
};

function mapStateToProps(state) {
  return {
    categories: state.categories
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);