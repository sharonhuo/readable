import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import App from './App';

const Root = ({ store }) => (
    <Provider store={store}>
        <BrowserRouter>
            <Route path="/" component={App}></Route>
        </BrowserRouter>
    </Provider>
)

Root.propTypes = {store: PropTypes.object.isRequired}

export default Root;






