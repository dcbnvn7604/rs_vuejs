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
      getByTestId('home');
    }).not.toThrow();
    await findByTestId('login');
    expect(() => {
      getByTestId('login');
    }).not.toThrow();
    expect(() => {
      getByTestId('home');
    }).toThrow();
  });

  test('logined redirect to page home', async () => {
    let mock = jest.spyOn(window.localStorage.__proto__, "getItem");
    mock.mockReturnValue("token");

    const { getByTestId, findByTestId } = render(App, {routes}, (vue, store, router) => {
      router.push('/login');
    });
    expect(() => {
      getByTestId('login');
    }).not.toThrow();
    expect(() => {
      getByTestId('home');
    }).toThrow();
    await findByTestId('home');
    expect(() => {
      getByTestId('login');
    }).toThrow();
    expect(() => {
      getByTestId('home');
    }).not.toThrow();
    mock.mockRestore();
  });

  test('login success redirect to page home', async () => {
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      status: 200,
      json: () => Promise.resolve({'token': 'token1'})
    }));

    const { getByTestId, findByTestId, debug } = render(App, {routes});

    await findByTestId('login');
    await fireEvent.update(getByTestId('usernameInput', 'username1'));
    await fireEvent.update(getByTestId('passwordInput', 'password1'));
    await fireEvent.click(getByTestId('loginButton'));

    await findByTestId('home');
    expect(() => {
      getByTestId('login');
    }).toThrow();
    expect(() => {
      getByTestId('home');
    }).not.toThrow();
  });
});