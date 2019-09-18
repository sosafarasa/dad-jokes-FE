
import React, { Component } from "react";
import axios from "axios";

import CardList from "./CardList";
import CardForm from "./CardForm";
import { cardData } from "../data";


export default class Content extends Component {
  constructor() {
    super();
    this.state = {
      cards: [],
      newPost: [],
      username: ""
    };
  }

  getPost = () => {
    //const token = localStorage.getItem("token");
    const options = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
      //if (token) {
        
        axios.get("https://dad-jokes2019.herokuapp.com/randomJoke",{
          options
        })
        .then(res => {
          console.log(res.data.joke)
          this.setState({
            cards: res.data.joke
          })
            this.setState({ loggedIn: true, cards: res.data.joke })

        })
        .catch(err => {
          //this.props.history.push("/login");
          console.log(err);
        });
    //}

  };

  componentDidMount() {
    this.getPost();
  }

  componentDidUpdate(prevProps) {
    const { pathname } = this.props.location;
    if (pathname === "/" && pathname !== prevProps.location.pathname) {
      this.getPost();
    }
    if (this.state.newPost.length > 0) {
      this.getPost();
      this.setState({
        newPost: [],
        cards: cardData
      });
    }
  }

  logout = () => {
    localStorage.removeItem("token");
    this.props.history.push("/Login");
  };

  addNewJoke = info => {
    const token = localStorage.getItem("token");
    const options = {
      headers: {
        Authorization: token
      }
    };

    if (token) {
      axios
        .post(
          /* " URL " ,*/
          info,
          options
        )
        .then(res => this.setState({ newPost: res.data }))
        .catch(err => console.log(err));
    }
  };

  render() {
    if(!localStorage.getItem('token')) {this.props.history.push('/login')}
    return (
      <div className="content-container">
        <CardList card={this.state.cards} toggleCard={this.toggleCard} />
        <CardForm addNewJoke={this.addNewJoke} />
      </div>
    );
  }
}