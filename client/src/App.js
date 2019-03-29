import React, { Component } from "react";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import { BrowserRouter, Route } from "react-router-dom";

import store from "./store";
import setAuthToken from "./utils/setAuthToken";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";

import "./App.css";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clrCurrentProfile } from "./actions/profileActions";

import PrivateRoute from "./components/common/PrivateRoute";
import CreateProfile from "./components/create-profile/CreateProfile";
import EditProfile from "./components/edit-profile/EditProfile";

//check for token
if (localStorage.jwtToken) {
  //set token to auth header
  setAuthToken(localStorage.jwtToken);
  //decode token to get user data
  const decoded = jwt_decode(localStorage.jwtToken);
  //set current user and isauthenticated
  store.dispatch(setCurrentUser(decoded));

  //check for expired token

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //logout user
    store.dispatch(logoutUser());
    store.dispatch(clrCurrentProfile());
    //TODO: clear current profile
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />

              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute
                exact
                path="/create-profile"
                component={CreateProfile}
              />
              <PrivateRoute
                exact
                path="/edit-profile"
                component={EditProfile}
              />
            </div>
            <Footer />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
