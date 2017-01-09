import React, { Component } from 'react';
import logo from './sticky-logo.png';
import cartLogo from './shoppingCart.png';
import remove from './remove.png';
import './App.css';

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
    }
    this.wholesale = this.wholesale.bind(this);
    this.display = this.display.bind(this);
    this.displayCart = this.displayCart.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }
  getStoreItems() {
    fetch('https://sneakpeeq-sites.s3.amazonaws.com/interviews/ce/feeds/store.js')
    .then(res => res.json())
    .then(data => {
      console.log('Returned from Fetch Call: ', data)
      let items = data.products.map(item => {
        item.minPrice -= item.minPrice * 0.25;
        item.minPrice = Math.round(item.minPrice);
        item.currentPrice = item.defaultPriceInCents;
        return item
      });
      console.log('initial items: ', items);
      this.setState({storeItems: items, storeObj: data});
    })
  }

  addToCart(e) {
    let temp = e;
    console.log('New Event: ', temp)
    let newCart = this.state.cart.slice();
    let newQuant = this.state.quantityInCart;
    let alreadyInCart = false;
    newCart.forEach((item, index) => {
      if(temp.id === item.id) {
        alreadyInCart = true;
        item.quantity += 1;
        item.cost = item.quantity * item.currentPrice;
        console.log('new currentPrice: ', item.cost)
      }
    })
    console.log('new Cart 1: ', newCart);
    if(!alreadyInCart){
      temp.quantity = 1
      newCart.push(temp);
      console.log('shoppingCart: ', newCart);
    }
    newQuant++
    return this.setState({cart: newCart, quantityInCart: newQuant});
  }

  removeFromCart(e) {
    let newCartQuant = this.state.quantityInCart;
    let newCart = this.state.cart.slice();
    this.state.cart.forEach((item, index) => {
      if(item.id === e.id){
        if(item.quantity === 1){
          newCart.splice(index, 1);
        } else {
          item.quantity--;
          item.cost = item.quantity * item.currentPrice;
        }
      }
    })
    newCartQuant--;
    return this.setState({cart: newCart, quantityInCart: newCartQuant});
  }

  componentDidMount() {
    this.getStoreItems();
  }

  wholesale() {
    if(this.state.displayDisc){
      return (
        <div>{this.state.storeItems.map((item) => {
          item.currentPrice = item.minPrice;
          return (
          <div className='storeItem' key={item.id} value={item}
            onClick={this.addToCart.bind(this, item)}>
          <img src={item.mainImage.ref} alt="item" />
          <p>{item.name}</p>
          <p>Price: $<b style={{color: 'red'}}>{item.currentPrice / 100}</b></p>
          <p>MSRP: ${item.msrpInCents / 100}</p>
          </div>
          )})
        }
        </div>
      )
    } else {
      return (
        <div>{this.state.storeItems.map((item) => {
          item.currentPrice = item.defaultPriceInCents;
          return (
            <div className='storeItem' key={item.id} value={item}
              onClick={this.addToCart.bind(this, item)}>
              <img src={item.mainImage.ref} alt="item" />
              <p>{item.name}</p>
              <p>Price: ${item.currentPrice / 100}</p>
              <p>MSRP: ${item.msrpInCents / 100}</p>
            </div>
            )
            })}
        </div>)
    }
  }

  display() {
    if(this.state.displayDisc){
      let regularCart = this.state.cart;
      regularCart.forEach((item) => {
        item.cost = item.quantity * item.defaultPriceInCents;
      })
      return this.setState({displayDisc: false, cart: regularCart});
    } else {
      let discountCart = this.state.cart;
      discountCart.forEach((item) => {
        item.cost = item.quantity * item.minPrice;
      })
      return this.setState({displayDisc: true, cart: discountCart});
    }
  }

  displayCart() {
    if(this.state.displayCart){
      return this.setState({displayCart: false})
    } else {
      return this.setState({displayCart: true})
    }
  }

  shoppingCart() {
    let cartTotal = 0;
    if(this.state.displayCart) {
        return (
          <div className='cart' style={{'zIndex': 1, 'width': 500,
            'position': 'absolute'}}>
            <h2>Your shopping Cart</h2>
            <ul>
              {this.state.cart.map((item) => {
                cartTotal += item.cost;
                return (
                  <li key={item.id} style={{'textAlign': 'left'}}>{item.name} Price: ${item.cost /
                    100} X <b style={{color: 'red'}}>{item.quantity}</b>
                    <img
                      src={remove}
                      onClick={this.removeFromCart.bind(this, item)}
                      alt='remove from cart'
                      style={{height: 15, width:15, paddingLeft: 20,
                        'float':'right'}}
                    /></li>
                  )
              })}
            </ul>
            <h3>Total Price: $ {cartTotal / 100}</h3>
            </div>
        )
    } else {
      return (<div></div>)
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Simple Store Front</h2>
        </div>
        <div className='wholesaleDisc'>
          <p><input type="Checkbox" value="discount"
              onChange={this.display}/>Check if Purchasing Wholesale to apply 25% discount</p>
          <p><img
              src={cartLogo}
              alt='shopping cart'
              style={{height: 40, width: 40}}
              onClick={this.displayCart}
              />
              ({this.state.quantityInCart})
          </p>
          {this.shoppingCart()}
        </div>
        <h3>{this.state.storeObj.pageTitle}</h3>
        <div className='storeItems'>
          {this.wholesale()}
        </div>
      </div>
    );
  }
}

export default App;
