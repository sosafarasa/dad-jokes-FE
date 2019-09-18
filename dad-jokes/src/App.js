import React, { Component } from "react";
import "./App.css";
import { NavLink, Switch, Route, withRouter } from "react-router-dom";
import { Redirect } from "react-router";
import Register from "./Authentication/Register";
import Content from "./components/Content";
import Login from "./Authentication/Login";
import Profile from "./Authentication/Profile";
import PrivateRoute from "./Authentication/PrivateRoute";

class App extends Component {
  render() {
    return (
      <div className="App">
        <nav className="top-nav">
          <div className="reg-login">
          <NavLink className="top-nav-tab sign-in reg" to="/register">
            Register
          </NavLink>
            <NavLink className="top-nav-tab sign-in" to="/login">
              Login
            </NavLink>
          </div>
          <NavLink className="top-nav-tab main" to="/content">
            Home
          </NavLink>
          <NavLink className="top-nav-tab main" to="/profile">
            Profile
          </NavLink>
          <NavLink
              className="top-nav-tab main"
              to="/login"
              onClick={() => localStorage.removeItem("token")}
            >
              Log Out
            </NavLink>
        </nav>
        

        <section>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/content" />} />
            <Route path="/content" component={Content} />
            <Route path="/login" component={Login} render={() => <Redirect to="/profile" />}/>
            <Route path="/register" component={Register} render={() => <Redirect to="/profile" />} />
            <PrivateRoute exact path= "/profile" component={Profile}/>
          </Switch>
        </section>
      </div>
    );
  }
}

export default withRouter(App);