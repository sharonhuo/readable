import React, { Component } from "react";

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.editingComment;
  }

  handleChange(event) {
    this.setState(
      {
        [event.target.name]: event.target.value
      }
    );
  }

  validateForm() {
    let inputFields = document.querySelectorAll("input,textarea");
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
      //there are errors, do not submit the form
    } else {
      this.props.onSubmit({
        ...this.state,
        timestamp: new Date().getTime()
      });
    }
  }

  handleCancel(e) {
    e.preventDefault();
    this.props.onCancel();
  }

  isFieldValid(refName) {
    const fieldLabel = document.getElementById(`${refName}Label`).textContent;
    const errorField = document.getElementById(`${refName}Error`);
    const validity = this.refs[refName].validity;

    if (!validity.valid && validity.valueMissing) {
      errorField.textContent = `${fieldLabel} is required`;
      return false;
    }

    errorField.textContent = "";
    return true;
  }

  render() {
    return (
      <div>
        <form className="form-horizontal">
          <div className="form-group">
            <label htmlFor="commentBody" id="bodyLabel">
              Body
            </label>
            <textarea
              type="text"
              rows="3"
              className="form-control"
              ref="body"
              id="commentBody"
              name="body"
              value={this.state.body}
              onChange={this.handleChange.bind(this)}
              required
            />
            <div className="error" id="bodyError" />
          </div>
          <div className="form-group">
            <label htmlFor="commentAuthor" id="authorLabel">
              Author
            </label>
            <input
              type="text"
              className="form-control"
              ref="author"
              id="commentAuthor"
              name="author"
              value={this.state.author}
              onChange={this.handleChange.bind(this)}
              required
            />
            <div className="error" id="authorError" />
          </div>
          <div className="form-group">
            <button type="button" className="btn btn-primary" onClick={this.handleSubmit.bind(this)}>Submit</button>
            <button type="button" className="btn btn-danger" onClick={this.handleCancel.bind(this)}>Cancel</button>
          </div>
        </form>
      </div>
    );
  }
}

export default CommentForm;
