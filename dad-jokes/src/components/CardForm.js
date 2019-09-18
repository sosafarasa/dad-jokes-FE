import React, { Component } from "react";
import Card from "./Card";

class CardForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "private",
      joke: "",
      username: localStorage.getItem("username"), 
    };
  }

  addJoke = event => {
    event.preventDefault();
    this.props.addNewJoke(this.state);

    this.setState({
    ...this.state,
      category: "private",
      dummyJoke: ""
    });
    return(
    <Card/>
    )
  };
  

  handleInputChange = e => {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="input-form">
        <h2>Add Joke</h2>
        <form onSubmit={this.addJoke}>
          <div className="input">
            <input
              onChange={this.handleInputChange}
              placeholder="Joke"
              value={this.state.dummyJoke}
              name="dummyJoke"
              className="input-box"
            />
            <div className="category-select">
              <label className="category-label">Category:</label>
              <select name="category" onChange={this.handleInputChange}>
                <option  path= '/content' value="public" >Public</option>
                <option  path= '/profile' value="private">Private</option>
              </select>
            </div>
          </div>
          <button onClick={this.addJoke} className="save-joke-btn" type="submit">Save</button>
        </form>
      </div>
    );
  }
}

export default CardForm;