import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import * as actions from "../actions";
import ToDoListItem from "./ToDoListItem";

class ToDoList extends Component {
  state = {
    addFormVisible: false,
    addFormValue: ""
  };

  handleInputChange = event => {
    this.setState({ addFormValue: event.target.value });
  };

  handleFormSubmit = event => {
    const { addFormValue } = this.state;
    const { addToDo, auth } = this.props;
    event.preventDefault();
    addToDo({ title: addFormValue }, auth.uid);
    this.setState({ addFormValue: "" });
  };

  renderAddForm = () => {
    const { addFormVisible, addFormValue } = this.state;
    if (addFormVisible) {
      return (
        <form onSubmit={this.handleFormSubmit}>
          <input
            type="text"
            value={addFormValue}
            className="form-control"
            onChange={this.handleInputChange}
          />
        </form>
      );
    }
  };

  renderToDos() {
    const { data } = this.props;
    const toDos = _.map(data, (value, key) => {
      return <ToDoListItem key={key} todoId={key} todo={value} />;
    });
    if (!_.isEmpty(toDos)) {
      return toDos;
    }
    return (
      <div className="d-flex flex-column">
        <h4 className="text-center">You have no tasks</h4>
        <p className="text-center">Add new tasks by clicking add button in the bottom of the screen</p>
      </div>
    );
  }

  componentWillMount() {
    const { auth } = this.props;
    this.props.fetchToDos(auth.uid);
  }

  render() {
    const { addFormVisible } = this.state;
    if (this.props.data === "loading") {
      return <div></div>
    }
    return (
      <div className="card m-5">
        <div className="card-header">
          <div className="d-flex justify-content-between">
            <h4>Tasks</h4>
            <button
              className="btn btn-danger"
              onClick={this.props.signOut}
            >
              Sign Out
            </button>
          </div>
        </div>
        <div className="card-body">
          {this.renderToDos()}
        </div>
        <div className="card-footer">
          <div className="row">
            <div className="col-1">
              <button
                className={`btn ${addFormVisible?'btn-danger':'btn-primary'}`}
                onClick={() => this.setState({ addFormVisible: !addFormVisible })}
              >
                {addFormVisible ? (
                  <i className="fa fa-times"></i>
                ) : (
                  <i className="fa fa-plus"></i>
                )}
              </button>
            </div>
            <div className="col-11">
              {this.renderAddForm()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ data, auth }) => {
  return {
    data,
    auth
  };
};

export default connect(mapStateToProps, actions)(ToDoList);
