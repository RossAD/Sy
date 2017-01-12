import React, { Component } from 'react';
import logo from './sticky-logo.png';
import cartLogo from './shoppingCart.png';

class Header extends Component {
  render() {
    return (
      <div className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <div className='Cart-info'>
          <img
            className='Cart-logo'
            src={cartLogo}
            alt='shopping cart'
            onClick={this.props.displayCart}
          />
          ({this.props.quantityInCart})
        </div>
        <div className='wholesaleDisc'>
          <input type='checkbox' onChange={this.props.wholesaleDisplay} />
          Wholesale 25% Discount
        </div>
        <h2>Simple Store Front</h2>
      </div>
    )
  }
}

module.exports = Header;
