import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

class PostForm extends Component {

    constructor(props) {
        super(props);
        this.state = this.props.newPost;
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.newPost !== this.props.newPost) {
            this.setState({
                ...nextProps.newPost,
            });
        }
    }

    validateForm() {
        //TODO : put this function in the util so that the comment form 
        //can share with it.
        let inputFields = document.querySelectorAll("input,textarea,select");
        let isFormValid = true;
        const inputs = Array.prototype.slice.call(inputFields);

        inputs.forEach(input => {
            const isInputValid = this.isFieldValid(input.name);
            if (!isInputValid) {
                isFormValid = false;
            }
        });
        return isFormValid;
    }

    handleSubmit(e) {
        e.preventDefault();
        if (!this.validateForm()) {
            //has errors, do not submit the form
        } else {
            this.props.onSubmit({
                ...this.state,
                timestamp: new Date().getTime()
            });

            this.state = {
                title: "",
                category: "",
                body: "",
                author: ""
            };
        }
    }

    isFieldValid(refName) {
        if (!refName) {
            //do nothing, not the fields in the form
            return true;
        }
        const errorField = document.getElementById(`${refName}Error`);

        if (refName === "category") {
            this.refs.category.setCustomValidity("");
            if (this.state.category === "") {
                let errorMsg = "Category is required";
                this.refs.category.setCustomValidity(errorMsg);
                errorField.textContent = errorMsg;
                return false;
            }
        }

        const fieldLabel = document.getElementById(`${refName}Label`).textContent;
        const validity = this.refs[refName].validity;

        if (!validity.valid && validity.valueMissing) {
            errorField.textContent = `${fieldLabel} is required`;
            return false;
        }

        errorField.textContent = "";
        return true;
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }




    render() {
        const { isOpen, toggle, categories } = this.props;
        return (
            <Modal
                isOpen={isOpen}
                toggle={toggle}
            >
                <ModalHeader>Add/Update post</ModalHeader>
                <ModalBody>
                    <form className="form-horizontal">
                        <div className="container">
                        </div>
                        <div className="form-group">
                            <label htmlFor="postTitle" id="titleLabel">
                                Title
                            </label>
                            <input
                                className="form-control"
                                type="text"
                                ref="title"
                                id="postTitle"
                                name="title"
                                value={this.state.title}
                                onChange={this.handleChange.bind(this)}
                                required
                            />
                            <div className="error" id="titleError" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="category" id="categoryLabel">
                                Category
                            </label>
                            <div className="input-group">
                                <select
                                    className="form-control"
                                    ref="category"
                                    name="category"
                                    value={this.state.category}
                                    onChange={this.handleChange.bind(this)}
                                >
                                    <option value="" />
                                    {categories !== undefined && categories.map(category => (
                                        <option key={category.path}
                                            value={category.path}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="error" id="categoryError" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="postBody" id="bodyLabel">
                                Body
                            </label>
                            <textarea
                                type="text"
                                rows="3"
                                className="form-control"
                                id="postBody"
                                ref="body"
                                name="body"
                                value={this.state.body}
                                onChange={this.handleChange.bind(this)}
                                required
                            />
                            <div className="error" id="bodyError" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="postAuthor" id="authorLabel">
                                Author
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="postAuthor"
                                name="author"
                                ref="author"
                                value={this.state.author}
                                onChange={this.handleChange.bind(this)}
                                required
                            />
                            <div className="error" id="authorError" />
                        </div>
                        <button type="button" className="btn btn-primary" onClick={this.handleSubmit.bind(this)}>Submit</button>
                        <button type="button" className="btn btn-danger" onClick={toggle}>Cancel</button>
                    </form>
                </ModalBody>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
        ...state.categories
    };
};

export default withRouter(connect(mapStateToProps)(PostForm));