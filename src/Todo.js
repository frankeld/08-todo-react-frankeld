import React, { Component } from 'react';
import './Todo.css';

class Todo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }
  componentDidMount() {
    fetch("https://api.kraigh.net/todos", {
        method: "GET",
        headers: {
            "x-api-key": "66d24650014ef29878e637f3b1e42641eee0f334d21ecd8a6aa518ba2c1ce37b"
        }
    })
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const {error, isLoaded, items} = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
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

}

export default Todo;
