import React, { Component } from 'react';
import logo from './sticky-logo.png';
import cartLogo from './shoppingCart.png';
import Search from './Search.js';

class Header extends Component {
  render() {
    return (
      <div className='App-header'>
        <div className='wholesaleDisc'>
          <input className='Wholesale-check' type='checkbox' onChange={this.props.wholesaleDisplay} />
          Wholesale 25% Discount
        </div>
        <div className='Icon-title'>
          <img src={logo} className='App-logo' alt='logo' />
          <p className='Page-title'>Simple Store Front</p>
        </div>
        <Search
          handleSearchTermEvent={this.props.handleSearchTermEvent}
          searchTerm={this.props.searchTerm}
        />
        <div className='Cart-info'>
          <img
            className='Cart-logo'
            src={cartLogo}
            alt='shopping cart'
            onClick={this.props.displayCart}
          />
          ({this.props.quantityInCart}) ${this.props.cartTotal / 100}
        </div>
      </div>
    )
  }
}

module.exports = Header;
