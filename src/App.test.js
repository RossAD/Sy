import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import StoreItems from './StoreItems.js';
import ShoppingCart from './ShoppingCart.js';
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
    const p = wrapper.find('input');
    p.simulate('change');
    console.log('wrapper: ', wrapper.state().storeObj);
    expect(wrapper.state().displayDisc).toEqual(true);
    p.simulate('change');
    expect(wrapper.state().displayDisc).toEqual(false);
  })

  it('should call displayCart function on icon click', () => {
    const wrapper = mount(<App />);
    const p = wrapper.find('.Cart-logo');
    p.simulate('click');
    //console.log('Cart logo: ', wrapper.state().storeItems);
    expect(wrapper.state().displayCart).toEqual(true);
    p.simulate('click');
    expect(wrapper.state().displayCart).toEqual(false);
  })

  pit('calls request and success actions if the fetch response was successful', () => {
    const mockResponse = (status, statusText, response) => {
      return new window.Response(response, {
          status: status,
          statusText: statusText,
          headers: {
                'Content-type': 'application/json'
              }
        });
    };

    const wrapper = mount(<App />);
    console.log('get items function: ', wrapper.instance().getStoreItems);
  })
})

describe('<StoreItems />', () => {
  it('renders StoreItems without crashing', () => {
    const div = document.createElement('div');
    const addToCart = (e) => {
      return console.log('Test', e);
    }
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
