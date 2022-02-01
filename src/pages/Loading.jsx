import React, { Component } from 'react';

export default class Loading extends Component {
  render() {
    return (
      <div className="loading-div">
        <img src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif" alt="Loading Gif" className="loading-gif" />
        <span className="loading-message">Carregando...</span>
      </div>
    );
  }
}
