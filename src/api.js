export class UnauthenticatedException {};
export class UnsupportException {};

class API {
  constructor() {
    return new Proxy(this, {
      get: (api, field) => {
        if (field != 'setHost' && !this.host) {
          throw new Error('No api host');
        }
        if (['setToken', 'login', 'setHost', 'host'].includes(field)) return api[field];
        if (!this.token) {
          throw new UnauthenticatedException();
        }
        return api[field];
      }
    });
  }

  setHost(host) {
    this.host = host;
  }

  setToken(token) {
    this.token = token;
  }

  async listEntry() {
    let response = await fetch(`${this.host}/api/entry/`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    switch (response.status) {
      case 200:
        return await response.json();
      default:
        throw new UnsupportException();
    }
  }

  async login(username, password) {
    let response = await fetch(`${this.host}/api/auth/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username, password})
    });
    switch (response.status) {
      case 200: 
        let _response = await response.json();
        return _response['token'];
      default:
        throw new UnsupportException();
    }
  }
}

const api = new API();

export default api;