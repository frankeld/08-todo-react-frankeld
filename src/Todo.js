import React, { Component } from 'react';
import './Todo.css';

class Todo extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const items = this.props.items;
    return (
      <ul id="itemList">
        {items.map(item => (
          <li key={item.id} className={item.completed ? 'completed' : ''}>
            {item.text}
          </li>
        ))}
      </ul>
    );
  }

}

export default Todo;
