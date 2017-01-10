import React, { Component } from 'react';
import Remove from './remove.png';

class ShoppingCart extends Component {

  render() {
    if(this.props.display) {
      return (
        <div className='Cart'>
          <h2>Your shopping Cart</h2>
          <ul>
            {this.props.cart.map((item) => {
              return (
                <li className="Cart-item" key={item.id}>{item.name} Price: ${item.cost /
                  100} X <b style={{color: 'red'}}>{item.quantity}</b>
                  <img
                    className="Remove-logo"
                    src={Remove}
                    onClick={this.props.remove.bind(this, item)}
                    alt='remove from cart'
                    /></li>
                  )
            })}
          </ul>
          <h3>Total Price: $ {this.props.cartTotal / 100}</h3>
        </div>
      )
    } else {
      return (<div></div>)
    }
  }
}
module.exports = ShoppingCart;
