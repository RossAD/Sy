import React, { Component } from 'react';
import logo from './sticky-logo.png';
import cartLogo from './shoppingCart.png';
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
    newCart.push(temp);
    this.setState({cart: newCart});
    console.log('shoppingCart: ', this.state.cart);
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
      this.setState({displayDisc: false});
    } else {
      this.setState({displayDisc: true});
    }
  }

  displayCart() {
    if(this.state.displayCart){
      this.setState({displayCart: false})
    } else {
      this.setState({displayCart: true})
    }
  }

  shoppingCart() {
    let cartTotal = 0;
    if(this.state.displayCart) {
      return (
        <div className='cart' style={{'zIndex': 1, 'float': 'right',
          'position': 'absolute'}}>
          <h2>Your shopping Cart</h2>
            <ul>
              {this.state.cart.map((item) => {
                cartTotal += item.currentPrice;
                return (
                  <li key={item.id}>{item.name} Price: ${item.currentPrice / 100}</li>
                  )
              })}
            </ul>
            <h3>Total Price: {cartTotal / 100}</h3>
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
              ({this.state.cart.length})
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
