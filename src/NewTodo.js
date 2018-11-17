import React, { Component } from 'react';
import './NewTodo.css';

class NewTodo extends Component {
  render() {
    return (
    <form onsubmit="addTodo(event);">
      <input type="text" id="todoInput" placeholder="Remind me to..."></input>
      <input type="submit" value="Add"></input>
    </form>
    );
  }
}

export default NewTodo;
