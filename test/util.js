import '@testing-library/jest-dom'
import { render as _render } from '@testing-library/vue';
import Vue from 'vue';
import Vuetify from 'vuetify';

import store from '../src/store';

Vue.use(Vuetify);

export function render(component, options, callback) {
  const root = document.createElement('div');
  root.setAttribute('data-app', 'true');

  return _render(
    component,
    {
      container: document.body.appendChild(root),
      vuetify: new Vuetify(),
      store,
      ...options,
    },
    callback
  );
}