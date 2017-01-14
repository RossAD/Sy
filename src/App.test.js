import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import StoreItems from './StoreItems.js';
import ShoppingCart from './ShoppingCart.js';
import testBlob from './testBlob.js';
import testData from './testData.js';
import { mount, shallow } from 'enzyme';
import renderer from 'react-test-renderer';


describe('<App /> and index.js', () => {
  it('renders main App without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });

  it('renders App from index.js', () => {
    const rendered = renderer.create(<App />);
    expect(rendered.toJSON()).toMatchSnapshot();
  })

  it('should call Wholesale function on checkbox change', () => {
    const wrapper = mount(<App />);
    let tempData = testData;
    wrapper.setState({storeItems: tempData, cart: tempData});
    const checkBox = wrapper.find('.Wholesale-check');
    checkBox.simulate('change');
    expect(wrapper.state().displayDisc).toEqual(true);
    checkBox.simulate('change');
    expect(wrapper.state().displayDisc).toEqual(false);
  })

  it('should call displayCart function on icon click', () => {
    const wrapper = mount(<App />);
    const cartLogo = wrapper.find('.Cart-logo');
    cartLogo.simulate('click');
    expect(wrapper.state().displayCart).toEqual(true);
    cartLogo.simulate('click');
    expect(wrapper.state().displayCart).toEqual(false);
  })

  it('calls calls add method and adds item to cart', () => {
    let tempData = testData;
    const wrapper = mount(<App />);
    wrapper.setState({storeItems: tempData});
    const storeItems = wrapper.find('.storeItem');
    /*Initial click to add new items to cart*/
    storeItems.forEach((item) => {
      return item.simulate('click');
    })
    /*Second click to increase quantity of items in cart*/
    storeItems.forEach((item) => {
      return item.simulate('click');
    })
  })

  it('calls the remove method, successfully decrements quantity of item in cart', () => {
    let tempData = testData;
    const wrapper = mount(<App />);
    wrapper.setState({cart: tempData, displayCart: true});
    const cartItems = wrapper.find('.Cart-item');
    //Iterate through items and simulate click at index 1 to decrement quantity
    cartItems.forEach((item) => {
      if(item.key() === "1235"){
        let removal = item.find('.Remove-logo')
        return removal.simulate('click');
      }
    })
    expect(wrapper.state().cart[1].quantity).toEqual(1);
    wrapper.unmount();
  })

  it('calls the remove method to remove item fully from cart', () => {
    let tempData1 = testData;
    const wrapper = mount(<App />);
    wrapper.setState({cart: tempData1, displayCart: true});
    const cartItems = wrapper.find('.Cart-item');
    //Iterate through items and simulate 2 clicks at index 2 to decrement quantity
    cartItems.forEach((item, index) => {
      if(item.key() === "1235"){
        let removal = item.find('.Remove-logo')
        return removal.simulate('click');
      }
    })
    expect(wrapper.state().cart.length).toEqual(2);
  })

  it('stores returned data in state', () => {
    const mockResponse = (status, statusText, response) => {
      return new window.Response(response, {
        status: status,
        statusText: statusText,
        headers: {
          'Content-type': 'application/json'
        }
      });
    };
    global.fetch = require('jest-fetch-mock');
    let blob = JSON.stringify(testBlob);
    fetch.mockResponse(blob);
    let p1 = new Promise(
      (resolve, reject) => {
        const wrapper = mount(<App />);
        resolve(wrapper);
      }
    );
    p1.then((val) => {
        return expect(wrapper.state().cartItems.length).toBeGreaterThan(0);
      }
    )
  })
})

describe('<StoreItems />', () => {
  it('renders StoreItems without crashing', () => {
    //const div = document.createElement('div');
    const addToCart = (e) => {
      return console.log('Test', e);
    }
    //ReactDOM.render(<StoreItems storeItems={testData} add={addToCart} />)
    const storeComp = renderer.create(
      <StoreItems storeItems={testData} add={addToCart} />
    );

    let tree = storeComp.toJSON();
    expect(tree).toMatchSnapshot();
  })
})

describe('<ShoppingCart />', () => {
  it('renders ShoppingCart without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ShoppingCart />, div);
  })

  it('should render all items in cart', () => {
    const test = (e) => {
      console.log('Test remove', e);
    }
    const wrapper = mount(<ShoppingCart cart={testData} display='true' remove={test} cartTotal={testData.length}/>);
    expect(wrapper.find('li').length).toEqual(testData.length);
  })
})
