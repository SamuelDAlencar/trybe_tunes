import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import propTypes from 'prop-types';
import Loading from '../pages/Loading';
import * as userAPI from '../services/userAPI'; import image from '../images/image.png';

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
              <img src={ image } alt="" />
              <section className="nav">
                <Link data-testid="link-to-search" to="/search">Search</Link>
                <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
                <Link data-testid="link-to-profile" to="/profile">Profile</Link>
              </section>
              <section className="profile">
                {localStorage.getItem('user')
                  ? (
                    <section to="/">
                      <i className="far fa-user-circle fa-2x" />
                      <b data-testid="header-user-name">
                        {user}
                      </b>
                    </section>)
                  : <Link to="/"><b>Fazer Login</b></Link>}
              </section>
            </>)}
      </header>
    );
  }
}
