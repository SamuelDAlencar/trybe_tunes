import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import Loading from './pages/Loading';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import * as userAPI from './services/userAPI';

class App extends Component {
  constructor() {
    super();

    this.state = {
      input: '',
      isDisabled: true,
      isLoading: false,
      isLoggedin: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target: { value } }) {
    const MAX_VALUE = 3;

    this.setState(({ input: value }), () => {
      if (value.length >= MAX_VALUE) {
        this.setState({ isDisabled: false });
      } else {
        this.setState({ isDisabled: true });
      }
    });
  }

  async handleClick() {
    const { input } = this.state;

    this.setState({ isLoading: true });
    await userAPI.createUser({ name: input });
    this.setState({ isLoading: false, isLoggedin: true });
  }

  render() {
    const { input, isDisabled, isLoading, isLoggedin } = this.state;
    return (
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={ () => (
              <>
                <Login
                  inputHandler={ this.handleChange }
                  input={ input }
                  isDisabled={ isDisabled }
                  createUser={ this.handleClick }
                />
                {isLoading && <Loading /> }
                {isLoggedin && <Redirect to="/search" /> }
              </>
            ) }
          />
          <Route exact path="/search" component={ Search } />
          <Route exact path="/album/:id" component={ Album } />
          <Route exact path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/profile/edit" component={ ProfileEdit } />
          <Route exact path="*" component={ NotFound } />
        </Switch>
      </Router>
    );
  }
}

export default App;
