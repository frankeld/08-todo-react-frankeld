import React, { Component } from 'react';
import './App.css';
import Todo from './Todo';
import NewTodo from './NewTodo';
class App extends Component {
  constructor(props) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }
  addItem(newItem) {
    var newItems = this.state.items;
    newItems.push(newItem);
    this.setState({items: newItems});
    // console.log(newItem);
  }
  deleteItem(deleteID) {
    this.setState({items: this.state.items.filter(currentItem => currentItem['id'] !== deleteID)});
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
            items: result
          });
        },
        (error) => {
          this.setState({
            error
          });
        }
      )
  }
  render() {
    return (
      <div id="content">
        <div id="header">
          <h1>To Do</h1>
          <NewTodo items={this.state.items} onItemAdd={this.addItem}/>
        </div>
        <div className="items">
            <Todo items={this.state.items} onItemDelete={this.deleteItem}/>
        </div>
      </div>
    );
  }
}

export default App;
