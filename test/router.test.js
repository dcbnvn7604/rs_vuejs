import { render } from './util.js';
import App from '../src/component/App.vue';
import { routes } from '../src/router.js';

describe('router', () => {
  test('demo', () => {
    const { getByTestId } = render(App, {routes});
  });
});