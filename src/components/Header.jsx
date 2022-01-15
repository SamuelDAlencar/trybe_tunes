import React, { Component } from 'react';
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
    console.log('entrou');
    this.setState({ isLoading: true });

    const userName = await userAPI.getUser();

    this.setState({ user: userName.name, isLoading: false });
  }

  render() {
    const { user, isLoading } = this.state;
    console.log(user);

    return (
      <header data-testid="header-component">
        {isLoading ? <Loading />
          : <span data-testid="header-user-name">{ user }</span>}
      </header>
    );
  }
}
