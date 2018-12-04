import React, { Component } from 'react';
import './App.css';
import Todo from './Todo';
import NewTodo from './NewTodo';
class App extends Component {
  constructor(props) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.flipItem = this.flipItem.bind(this);
    this.sortItemsByStatus = this.sortItemsByStatus.bind(this);
    this.sortItemsByTime = this.sortItemsByTime.bind(this);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      sortDirection: false
    };
  }
  addItem(newItem) {
    var newItems = this.state.items;
    newItems.push(newItem);
    this.setState({items: newItems});
    // console.log(newItem);
  }
  deleteItem(eleID) {
    this.setState({items: this.state.items.filter(currentItem => currentItem['id'] !== eleID)});
  }
  flipItem(eleID) {
    var index = this.state.items.findIndex(function(element) {return element['id'] === eleID});
    var newItems = this.state.items;
    newItems[index].completed = !newItems[index].completed;
    this.setState({items: newItems});
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
  sortItemsByStatus() {
    //from https://stackoverflow.com/questions/1069666/sorting-javascript-object-by-property-value
    var newItems = this.state.items;
    if (this.state.sortDirection){
      newItems.sort((a, b) => (a.completed ? 0 : 1) - (b.completed ? 0 : 1));
    } else {
      newItems.sort((b, a) => (a.completed ? 0 : 1) - (b.completed ? 0 : 1));
    }
    this.setState({items: newItems, sortDirection: !this.state.sortDirection});
  }
  sortItemsByTime() {
    var newItems = this.state.items;
    if (this.state.sortDirection) {
      newItems.sort((a, b) => a.created - b.created);
    } else {
      newItems.sort((b, a) => a.created - b.created);
    }
    this.setState({items: newItems, sortDirection: !this.state.sortDirection});

  }
  render() {
    return (
      <div id="content">
        <div id="header">
          <h1>To Do</h1>
          <button type="button" onClick={this.sortItemsByStatus}>Sort By Status</button>
          <button type="button" onClick={this.sortItemsByTime}>Sort By Time</button>
          <NewTodo items={this.state.items} onItemAdd={this.addItem}/>
        </div>
        <div className="items">
            <Todo items={this.state.items} onItemDelete={this.deleteItem} onItemFlip={this.flipItem}/>
        </div>
      </div>
    );
  }
}

export default App;
