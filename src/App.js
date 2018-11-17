import React, { Component } from 'react';
import './App.css';
import Todo from './Todo';
import NewTodo from './NewTodo';
class App extends Component {
  render() {
    return (
      <div id="content">
        <div id="header">
          <h1>To Do</h1>
          <NewTodo />
        </div>
        <div class="items">
          <ul id="itemList">
            <Todo />
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
