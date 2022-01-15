import React, { Component } from 'react';
import Header from '../components/Header';

export default class Album extends Component {
  render() {
    return (
      <>
        <Header />
        <div data-testid="page-album" />
      </>
    );
  }
}
