import React, { Component } from 'react';
import './NewTodo.css';

class NewTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("x-api-key", "66d24650014ef29878e637f3b1e42641eee0f334d21ecd8a6aa518ba2c1ce37b");
    var data = JSON.stringify({text: this.state.value});
    fetch("https://api.kraigh.net/todos", {
        method: "POST",
        mode: "no-cors",
        headers: myHeaders,
        body: data
    }) .then(res => res.json())
      .then(response => console.log('Success:', JSON.stringify(response)))
      .catch(error => console.error('Error:', error));
    this.setState({value: ''});
    event.preventDefault();
  }

  render() {
    return (
	    <form onSubmit={this.handleSubmit}>
	      <input type="text" id="todoInput" placeholder="Remind me to..." value={this.state.value} onChange={this.handleChange}></input>
	      <input type="submit" value="Add"></input>
	    </form>
    );
  }
}

export default NewTodo;
