import React from 'react';
import ReactDOM from 'react-dom';
import ShoppingCart from './ShoppingCart';

it('renders ShoppingCart without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ShoppingCart />, div);
})
