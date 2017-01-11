import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { addToCart } from './App.js'
import StoreItems from './StoreItems';
import TestData from './testData.js';
import renderer from 'react-test-renderer';

const testData = 
  [
    {
      "id": 1234,
      "mainImage": {
        "ref": "http://SomeImage.jpg"
      },
      "name": "Awesome Straw",
      "minPrice": 900,
      "currentPrice": 900,
      "defaultPriceInCents": 900
    },
    {
      "id": 1235,
      "mainImage": {
        "ref": "http://SomeIcon.ico"
      },
      "name": "Awesome Straw",
      "minPrice": 1000,
      "currentPrice": 1000,
      "defaultPriceInCents": 1000
    },
    {
      "id": 1236,
      "mainImage": {
        "ref": "http://SomePhoto.psd"
      },
      "name": "Awesome Straw",
      "minPrice":200,
      "currentPrice": 200,
      "defaultPriceInCents": 200
    }
  ];

it('renders StoreItems without crashing', () => {
  const div = document.createElement('div');
  let data = JSON.parse(JSON.stringify(testData));
  const addToCart = (e) => {
    let temp = e;
    let newCart = this.state.cart.slice();
    let newCartQuant = this.state.quantityInCart;
    let newCartTotal = this.state.cartTotal;
    let alreadyInCart = false;
    newCart.forEach((item, index) => {
      if(temp.id === item.id) {
        alreadyInCart = true;
        item.quantity += 1;
        newCartTotal += item.currentPrice;
        item.cost = item.quantity * item.currentPrice;
      }
    })
    if(!alreadyInCart){
      temp.quantity = 1;
      temp.cost = temp.quantity * temp.currentPrice;
      newCart.push(temp);
      newCartTotal += temp.currentPrice;
    }
    newCartQuant++
      return this.setState({
        cart: newCart,
        quantityInCart: newCartQuant,
        cartTotal: newCartTotal
      });
  }
  const storeComp = renderer.create(
    <StoreItems storeItems={testData} add={addToCart} />
  );

  let tree = storeComp.toJSON();
  expect(tree).toMatchSnapshot();
})
