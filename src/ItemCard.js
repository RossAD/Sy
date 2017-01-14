import React, { Component } from 'react';

class ItemCard extends Component {
  render() {
    return (
      <div
        className='storeItem'
        value={this.props.item}
        onClick={this.props.add.bind(this, this.props.item)}
      >
        <img
          className='Item-image'
          src={this.props.item.mainImage.ref}
          alt='item'
        />
        <p>{this.props.item.name}</p>
        <p>Price: ${this.props.item.currentPrice / 100}</p>
        <p>MSRP: ${this.props.item.msrpInCents / 100}</p>
      </div>
    )
  }
}

module.exports = ItemCard;
