import React, { Component } from 'react';
import ItemCard from './ItemCard.js';

class StoreItems extends Component {

  render() {
    if(`${this.props.searchTerm}`.length > 0){
      return (
        <div className='Store-block'>
        {this.props.storeItems
          .filter((item) => `${item.name}`.toUpperCase().indexOf(`${this.props.searchTerm}`.toUpperCase()) >= 0)
          .map((item) => (
            <ItemCard item={item} add={this.props.add} key={item.id} />
          ))
        }
        </div>
      )
    } else {
      return (
        <div className='Store-block'>
          {this.props.storeItems.map((item) => {
            return <ItemCard item={item} add={this.props.add} key={item.id} />
          })}
        </div>
      )
    }
  }
}

module.exports = StoreItems;
