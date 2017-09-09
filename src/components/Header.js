import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

class Header extends Component {

    render() {
        const { categories } = this.props;

        var categoriesLink = categories &&
            categories.map(category => (
                <li
                    key={category.name}
                    className="nav-item">
                    <NavLink
                        to={`/${category.path}`}>{category.name}</NavLink>
                </li>

            ));

        return (
            <div
                className="primary-nav fixed-top ">
                <nav
                    className="navbar navbar-inverse container">
                    <a className="navbar-brand">
                        {process.env.REACT_APP_NAME}
                        &nbsp;<small>{process.env.REACT_APP_VERSION}</small>
                    </a>

                    <li className="nav-item">
                        <NavLink to="/">
                            <i className="fa fa-home" />Posts index
                        </NavLink>
                    </li>

                    {categoriesLink}
                </nav>
            </div >
        )
    }
}

const mapStateToProps = state => {
    return state.categories;
};

export default connect(mapStateToProps, null)(Header);