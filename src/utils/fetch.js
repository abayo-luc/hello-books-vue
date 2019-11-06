const {
  VUE_APP_BACKEND_URL
} = process.env;
const tokenName = 'qwer-78';
const defaultOptions = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    Accept: 'application/json'
  }
};


class Fetch {
  constructor() {
    this.config = defaultOptions;
    this.url = '';
    this.data = {};
  }

  async request() {
    const token = await localStorage.getItem(tokenName);
    this.config.headers.Authorization = token;
    const response = await fetch(`${VUE_APP_BACKEND_URL}${this.url}`, {
      ...this.config,
      body: JSON.stringify(this.data)

    });
    const json = await response.json();
    switch (response.status) {
      case 200:
        return json;
      case 201:
        return json;
      default:
        throw json;
    }
  }

  async post(url, data) {
    this.config.method = 'POST';
    this.url = url;
    this.data = data;
    return this.request();
  }

  async put(url, data) {
    this.config.method = 'PUT';
    this.url = url;
    this.data = data;
    return this.request();
  }

  async get(url) {
    this.config.method = 'GET';
    this.url = url;
    return this.request();
  }
}

export default new Fetch();
