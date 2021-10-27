import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8000';

class AuthService {
  constructor() {
    this.session = axios.create({
      baseURL: API_URL,
      timeout: TIMEOUT,
      headers: authHeader()
    });
  }

  login(user) {
    return axios
      .post(API_URL + '/api/token/', {
        username: user.username,
        password: user.password,
        // FIXME: expires time
        expires: 5,
      })
      .then(response => {
        if (response.status == 200) {
          if (response.data) {
            localStorage.setItem('access_token', response.data.access_token);
            this.session = axios.create({
              baseURL: API_URL,
              timeout: TIMEOUT,
              headers: { 'Authorization': 'Bearer ' + response.data.access_token }
            });
            localStorage.setItem('token_type', response.data.token_type);
            localStorage.setItem('userinfo', JSON.stringify(response.data.user));
            localStorage.setItem('uid', response.data.userid);
          }
          return JSON.stringify(response.data.user);
        }
      });
  }

  getUser() {
    return this.session
      .get(API_URL + '/api/profile/', {})
      .then(response => {
        if (response.status == 200) {
          if (response.data) {
            localStorage.setItem('userinfo', JSON.stringify(response.data));
          }
        }
        return JSON.stringify(response.data);
      });
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('token_type');
    localStorage.removeItem('userinfo');
    localStorage.removeItem('uid');
    localStorage.removeItem('categories');
  }

  register(user) {
    return axios.post(API_URL + '/api/register/', {
      username: user.username,
      email: user.email,
      password: user.password
    });
  }

  getCategories() {
    return this.session
      .get(API_URL + '/api/category/')
      .then(response => {
        if (response.status == 200) {
          if (response.data) {
            localStorage.setItem('categories', JSON.stringify(response.data.data));
          }
        }
        return JSON.stringify(response.data);
      });
  }
}

export default new AuthService();
