const BACKEND_URL = 'https://hello-books-ch-heroku-d-djri62.herokuapp.com/api/v1';
const defaultOptions = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    Accept: 'application/json',
  },
};


class Fetch {
  constructor() {
    this.config = defaultOptions;
    this.url = '';
    this.data = {};
  }

  async request() {
    const response = await fetch(`${BACKEND_URL}${this.url}`, {
      ...this.config,
      body: JSON.stringify(this.data),

    });
    const json = await response.json();
    switch (response.status) {
      case 200:
        return json;
      case 201:
        return json;
      default:
        throw new Error(JSON.stringify(json));
    }
  }

  async post(url, data) {
    this.config.method = 'POST';
    this.url = url;
    this.data = data;
    return this.request();
  }
}

export default new Fetch();
