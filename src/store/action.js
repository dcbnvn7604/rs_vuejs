import { default as api, UnauthenticatedException } from '../api.js';

const actions = {
  checkLogin() {
    let token = localStorage.getItem('token');
    if (token) {
      api.setToken(token);
    } else {
      throw new UnauthenticatedException();
    }
  },

  async login(_, loginData) {
    let token = await api.login(loginData['username'], loginData['password']);
    localStorage.setItem('token', token);
  },

  async listEntry({commit}) {
    let entries = await api.listEntry();
    commit('setEntries', entries);
  }
}

export default actions;