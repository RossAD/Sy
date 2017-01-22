import React, { Component } from 'react';

class Search extends Component {
  render() {
    return (
      <div className='Search'>
        <form>
          <input
            className='Search-input'
            value={this.props.searchTerm}
            onChange={this.props.handleSearchTermEvent}
            type='search'
            placeholder='Search'
            results='5'
            name='s'
          />
        </form>
      </div>
    )
  }
}

module.exports = Search;
