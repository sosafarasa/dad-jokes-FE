import React, { Component } from "react";
import axios from "axios";

import CardList from "../components/CardList";
import CardForm from "../components/CardForm";
import { cardData } from "../data";

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      cards: [],
      newPost: [],
      username: ""
    };
  }

  getProfile = () => {
    const token = localStorage.getItem("token");
    const profile = localStorage.getItem(1);
    const options = {
      headers: {
        Authorization: token
      }
    };

    if (token) {
      axios
        .get(
          `https://dad-jokes2019.herokuapp.com/users/user/${profile}`,
          options
        )
        .then(res => {
          if (res.status === 201 && res.data) {
            console.log("Help!", res.data);
            this.setState({ loggedIn: true, cards: cardData });
          } else {
            throw new Error();
          }
        })
        .catch(err => {
          //  this.props.history.push("/login");
        });
    }
  };

  componentDidMount() {
    this.getProfile();
  }
 
  componentDidUpdate(prevProps) {
    const { pathname } = this.props.location;
    if (pathname === "/" && pathname !== prevProps.location.pathname) {
      this.getPost();
    }
    if (this.state.newPost.length > 0) {
      this.getPost();
      this.setState({
        newPost: []
      });
    }
  }

  logout = () => {
    localStorage.removeItem("token");
    this.props.history.push("/Login");
  };


  filterCards = () => {
    if (this.state.selected === "all") {
      return this.state.cards;
    } else {
      return this.state.cards.filter(
        card => card.category === this.state.selected
      );
    }
  };

  toggleCard = info => {
    const token = localStorage.getItem("token");
    const changes = { category: info.category, joke: info.joke, public: info.public };
    const id = info.id;
    console.log(info)
    const options = {
      headers: {
        Authorization: token
      }
    };

    if (token) {
      axios
        .put(
          `https://dad-jokes2019.herokuapp.com/users/user/{id}`,
          changes,
          options
        )
        .then(res =>
          this.setState({
            cards: this.state.cards.map(card => {
              if (card.id === id) {
                return {
                  ...card,
                };
              }
              return card;
            })
          })
        )
        .catch(err => console.log(err));
    }
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
          "https://dad-jokes2019.herokuapp.com/users/user",
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
        <CardList cards={this.filterCards()} toggleCard={this.toggleCard} />
        <CardForm addNewJoke={this.addNewJoke} />
      </div>
    );
  }
}