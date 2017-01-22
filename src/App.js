import React, { Component } from 'react';
import './App.css';
import ShoppingCart from './ShoppingCart.js';
import StoreItems from './StoreItems.js';
import Header from './Header.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      storeItems: [],
      storeObj: {},
      displayDisc: false,
      displayCart: false,
      cart: [],
      quantityInCart: 0,
      cartTotal: 0,
      searchTerm: '',
    }
    this.wholesaleDisplay = this.wholesaleDisplay.bind(this);
    this.displayCart = this.displayCart.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.handleSearchTermEvent = this.handleSearchTermEvent.bind(this);
  }

  setPricesState(data) {
    let items = data.products.map(item => {
      item.minPrice -= item.minPrice * 0.25;
      item.minPrice = Math.round(item.minPrice);
      item.currentPrice = item.defaultPriceInCents;
      return item
    });
    return items;
  }

  getStoreItems() {
    fetch('https://sneakpeeq-sites.s3.amazonaws.com/interviews/ce/feeds/store.js')
    .then(res => res.json())
    .then(data => {
      const items = this.setPricesState(data);
      this.setState({storeItems: items, storeObj: data});
    })
    .catch((error) => {
      throw error;
    })
  }

  componentWillMount() {
    this.getStoreItems();
  }

  handleSearchTermEvent(event) {
    this.setState({searchTerm: event.target.value});
  }

  addToCart(e) {
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

  removeFromCart(e) {
    let newCartQuant = this.state.quantityInCart;
    let newCart = this.state.cart.slice();
    let newCartTotal = this.state.cartTotal;
    newCart.forEach((item, index) => {
      if(item.id === e.id){
        if(item.quantity === 1){
          newCartTotal -= item.currentPrice;
          newCart.splice(index, 1);
        } else {
          item.quantity--;
          newCartTotal -= item.currentPrice;
          item.cost = item.quantity * item.currentPrice;
        }
      }
    })
    newCartQuant--;
    return this.setState({
      cart: newCart,
      quantityInCart: newCartQuant,
      cartTotal: newCartTotal
    });
  }

  wholesaleDisplay() {
    let newCartTotal = 0;
    let newStoreItems = this.state.storeItems;
    if(this.state.displayDisc){
      let regularCart = this.state.cart;
      regularCart.forEach((item) => {
        item.cost = item.quantity * item.defaultPriceInCents;
        newCartTotal += item.cost;
      })
      newStoreItems.forEach((item) => {
        item.currentPrice = item.defaultPriceInCents;
      })
      this.setState({
        displayDisc: false,
        cart: regularCart,
        storeItems: newStoreItems,
        cartTotal: newCartTotal
      });
    } else {
      let discountCart = this.state.cart;
      discountCart.forEach((item) => {
        item.cost = item.quantity * item.minPrice;
        newCartTotal += item.cost;
      })
      newStoreItems.forEach((item) => {
        item.currentPrice = item.minPrice;
      })
      this.setState({
        displayDisc: true,
        cart: discountCart,
        storeItems: newStoreItems,
        cartTotal: newCartTotal
      });
    }
  }

  displayCart() {
    if(this.state.displayCart){
      return this.setState({displayCart: false})
    } else {
      return this.setState({displayCart: true})
    }
  }

  render() {
    return (
      <div className='App'>
        <Header
          displayCart={this.displayCart}
          quantityInCart={this.state.quantityInCart}
          wholesaleDisplay={this.wholesaleDisplay}
          cartTotal={this.state.cartTotal}
          handleSearchTermEvent={this.handleSearchTermEvent}
          searchTerm={this.state.searchTerm}
        />
        <ShoppingCart
          remove={this.removeFromCart}
          cart={this.state.cart} cartTotal={this.state.cartTotal}
          display={this.state.displayCart}
          displayCart={this.displayCart}
        />
        <div className='Page-title'>
          <p>{this.state.storeObj.pageTitle}</p>
        </div>
        <p>Click item to add to cart</p>
        <StoreItems
          searchTerm={this.state.searchTerm}
          storeItems={this.state.storeItems}
          add={this.addToCart}
          displayDisc={this.state.displayDisc}
        />
      </div>
    );
  }
}
export default App;
