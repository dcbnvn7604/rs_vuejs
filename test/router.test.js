import { render } from './util.js';
import App from '../src/component/App.vue';
import { routes } from '../src/router.js';

describe('router', () => {
  test('no login redirect to page login', async () => {
    const { getByTestId, findByTestId, debug } = render(App, {routes});
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

  test.only('login redirect to page home', async () => {
    let mock = jest.spyOn(window.localStorage.__proto__, "getItem");
    mock.mockReturnValue("token");

    const { getByTestId, findByTestId, debug } = render(App, {routes}, (vue, store, router) => {
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
  });
});