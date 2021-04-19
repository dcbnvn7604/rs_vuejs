import { fireEvent } from '@testing-library/vue';

import { render } from './util.js';
import App from '../src/component/App.vue';
import { routes } from '../src/router.js';
import api from '../src/api';

describe('router', () => {
  afterEach(() => {
    api.setToken('');
  });

  test('no login redirect to page login', async () => {
    const { getByTestId, findByTestId } = render(App, {routes});
    expect(() => {
      getByTestId('login');
    }).toThrow();
    expect(() => {
      getByTestId('listentry');
    }).not.toThrow();
    await findByTestId('login');
    expect(() => {
      getByTestId('login');
    }).not.toThrow();
    expect(() => {
      getByTestId('listentry');
    }).toThrow();
  });

  test('logined redirect to page home', async () => {
    let mockFetch = jest.fn();
    mockFetch.mockReturnValue(Promise.resolve({
      status: 200,
      json: () => Promise.resolve([{id: 1, title: 'title 1', content: 'content 1'}]),
    }));
    global.fetch = mockFetch;
    let mock = jest.spyOn(window.localStorage.__proto__, "getItem");
    mock.mockReturnValue("token");

    const { getByTestId, findByTestId } = render(App, {routes}, (vue, store, router) => {
      router.push('/login');
    });
    expect(() => {
      getByTestId('login');
    }).not.toThrow();
    expect(() => {
      getByTestId('listentry');
    }).toThrow();
    await findByTestId('listentry');
    expect(() => {
      getByTestId('login');
    }).toThrow();
    expect(() => {
      getByTestId('listentry');
    }).not.toThrow();
    mock.mockRestore();
  });

  test('login success redirect to page home', async () => {
    let mockFetch = jest.fn();
    mockFetch.mockReturnValue(Promise.resolve({
      status: 200,
      json: () => Promise.resolve({'token': 'token1'})
    }));
    global.fetch = mockFetch;

    const { getByTestId, findByTestId } = render(App, {routes});

    await findByTestId('login');
    await fireEvent.update(getByTestId('usernameInput', 'username1'));
    await fireEvent.update(getByTestId('passwordInput', 'password1'));
    await fireEvent.click(getByTestId('loginButton'));

    await findByTestId('listentry');
    expect(() => {
      getByTestId('login');
    }).toThrow();
    expect(() => {
      getByTestId('listentry');
    }).not.toThrow();
  });

  test('go to creating page', async () => {
    api.setToken('token1');
    let mockFetch = jest.fn();
    mockFetch.mockReturnValue(Promise.resolve({
      status: 200,
      json: () => Promise.resolve([{id: 1, title: 'title 1', content: 'content 1'}]),
    }));
    global.fetch = mockFetch;

    const { getByTestId, findByTestId } = render(App, {routes});
    await findByTestId('listentry');
    expect(() => {
      getByTestId('editentry');
    }).toThrow();
    expect(() => {
      getByTestId('listentry');
    }).not.toThrow();
    await fireEvent.click(getByTestId('createButton'));
    await findByTestId('editentry');
    expect(() => {
      getByTestId('editentry');
    }).not.toThrow();
    expect(() => {
      getByTestId('listentry');
    }).toThrow();
  });
});