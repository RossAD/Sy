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
        <div className='Item-name'>
          <p>{this.props.item.name}</p>
        </div>
        <div className='Item-prices'>
          <p className={(this.props.displayDisc ? 'discount' : '')}>Price: ${this.props.item.currentPrice / 100}</p>
          <p>MSRP: ${this.props.item.msrpInCents / 100}</p>
        </div>
      </div>
    )
  }
}

module.exports = ItemCard;
