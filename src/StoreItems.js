import React, { Component } from 'react';

class StoreItems extends Component {

  render() {
    return (
      <div>{this.props.storeItems.map((item) => {
        return (
          <div className='storeItem' key={item.id} value={item}
            onClick={this.props.add.bind(this, item)} >
            <img className='Item-image' src={item.mainImage.ref} alt='item' />
            <p>{item.name}</p>
            <p>Price: ${item.currentPrice / 100}</p>
            <p>MSRP: ${item.msrpInCents / 100}</p>
          </div>
        )})
      }
      </div>
    )
  }
}

module.exports = StoreItems;
