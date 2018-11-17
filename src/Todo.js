import React, { Component } from 'react';
import './Todo.css';

class Todo extends Component {
  render() {
    return (
      <li onclick="flipCompleted(this);">
      <span class="listItemContent" id="1234">Do A Thing</span>
      <button type="button" name="deleteTodo" onclick="deleteTodo(event, this);">X</button>
      </li>
    );
  }
}

export default Todo;
