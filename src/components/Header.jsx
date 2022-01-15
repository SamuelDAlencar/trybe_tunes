import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import propTypes from 'prop-types';
import Loading from '../pages/Loading';
import * as userAPI from '../services/userAPI';

export default class Header extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      user: '',
    };

    this.fetchUser = this.fetchUser.bind(this);
  }

  componentDidMount() {
    this.fetchUser();
  }

  async fetchUser() {
    this.setState({ isLoading: true });

    const userName = await userAPI.getUser();

    this.setState({ user: userName.name, isLoading: false });
  }

  render() {
    const { user, isLoading } = this.state;

    return (
      <header data-testid="header-component">
        {isLoading ? <Loading />
          : (
            <>
              <span data-testid="header-user-name">{user}</span>
              <Link data-testid="link-to-search" to="/search">Search</Link>
              <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
              <Link data-testid="link-to-profile" to="/profile">Profile</Link>
            </>)}
      </header>
    );
  }
}
