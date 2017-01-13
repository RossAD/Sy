import React, { Component } from 'react';
import Remove from './remove.png';

class ShoppingCart extends Component {

  render() {
    if(this.props.display) {
      return (
        <div className='Cart' onClick={this.props.displayCart}>
          <p className='Cart-title'>Your shopping Cart</p>
          <ul className='Cart-items'>
            {this.props.cart.map((item) => {
              return (
                <li className='Cart-item' key={item.id}>
                  <span className='Quantity'>{item.quantity}</span>
                  Qty. | {item.name}
                  <span className='Price-remove'>Price: ${item.cost / 100}
                    <img
                      className='Remove-logo'
                      src={Remove}
                      onClick={this.props.remove.bind(this, item)}
                      alt='remove from cart'
                    />
                  </span>
                </li>
                  )
            })}
          </ul>
          <p>Total Price: $ {this.props.cartTotal / 100}</p>
        </div>
      )
    } else {
      return (<div></div>)
    }
  }
}
module.exports = ShoppingCart;
