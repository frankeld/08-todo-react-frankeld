import React, { Component } from 'react';
import './Todo.css';

class Todo extends Component {

  constructor(props) {
    super(props);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.flipTodo = this.flipTodo.bind(this);
  }
  deleteTodo(eleID, event) {
    event.stopPropagation(); //Used to prevent li onclick function from running
    event.preventDefault();
    fetch(('https://api.kraigh.net/todos/' + eleID), {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "66d24650014ef29878e637f3b1e42641eee0f334d21ecd8a6aa518ba2c1ce37b"
        }
      }).then(res => res.json())
      .then(response => {
        this.props.onItemDelete(eleID);
      })
      .catch(error => console.error('Error:', error));
  }
  flipTodo(eleID) {
    var index = this.props.items.findIndex(function(element) {return element.id === eleID});
    var data = {completed: !this.props.items[index].completed};
    fetch(('https://api.kraigh.net/todos/' + eleID), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "66d24650014ef29878e637f3b1e42641eee0f334d21ecd8a6aa518ba2c1ce37b"
        },
        body: JSON.stringify(data)
      })
      .then(response => {
        this.props.onItemFlip(eleID);
      })
      .catch(error => console.error('Error:', error));
  }
  render() {
    const items = this.props.items;
    return (
      <ul id="itemList">
        {items.map(item => (
          <li key={item.id} className={item.completed ? 'completed' : ''} onClick={this.flipTodo.bind(this, item.id)}>
            <span className="listItemContent" id={item.id}>{item.text}</span>
            <button type="button" name="deleteTodo" onClick={this.deleteTodo.bind(this, item.id)}>X</button>
          </li>
        ))}
      </ul>
    );

  }

}

export default Todo;
