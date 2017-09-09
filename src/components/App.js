
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './Header';
import PostIndex from './PostIndex';
import PostListByCategoryView from './PostListByCategoryView';
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
            <Route path="/:category/:id" component={PostDetailView} />
            <Route path="/:category" component={PostListByCategoryView} />
            <Route exact path="/" component={PostIndex} />
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