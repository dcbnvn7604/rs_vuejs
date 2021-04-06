export class UnauthenticatedException {};

class API {
  constructor() {
    return new Proxy(this, {
      get: (api, field) => {
        if (field == 'setToken') return api[field];
        if (!this.token) {
          throw new UnauthenticatedException();
        }
        return api[field];
      }
    });
  }

  setToken(token) {
    this.token = token;
  }

  async listEntry() {}
}

const api = new API();

export default api;