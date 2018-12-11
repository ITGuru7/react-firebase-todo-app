import React, { Component } from "react";
import { connect } from "react-redux";
import { completeToDo } from "../actions";

class ToDoListItem extends Component {
  handleCompleteClick = completeToDoId => {
    const { completeToDo, auth } = this.props;
    completeToDo(completeToDoId, auth.uid);
  };

  render() {
    const { todoId, todo } = this.props;
    return (
      <div key="toDoName" className="d-flex justify-content-between alert alert-info">
        <h4>{todo.title}</h4>
        <button
          className="btn btn-success"
          onClick={() => this.handleCompleteClick(todoId)}
        >
          <i className="fa fa-check"></i>
        </button>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    auth
  };
};

export default connect(mapStateToProps, { completeToDo })(ToDoListItem);
