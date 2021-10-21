import AuthService from '../services/auth.service'

const userinfo = localStorage.getItem('userinfo');
const initialState = userinfo
  ? { status: { loggedIn: true }, userinfo }
  : { status: { loggedIn: false }, userinfo: null };

export const auth = {
  namespaced: true,
  state: initialState,
  getters: {
    authorized: state => {
      return state.status.loggedIn
    }
  },
  actions: {
    login({ commit }, userinfo) {
      return AuthService.login(userinfo).then(
        userinfo => {
          commit('loginSuccess', userinfo);
          return Promise.resolve(userinfo);
        },
        error => {
          commit('loginFailure');
          return Promise.reject(error);
        }
      );
    },
    logout({ commit }) {
      AuthService.logout();
      commit('logout');
    },
    register({ commit }, userinfo) {
      return AuthService.register(userinfo).then(
        response => {
          commit('registerSuccess');
          return Promise.resolve(response.data);
        },
        error => {
          commit('registerFailure');
          return Promise.reject(error);
        }
      );
    }
  },
  mutations: {
    loginSuccess(state, userinfo) {
      state.status.loggedIn = true;
      state.userinfo = userinfo;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.userinfo = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.userinfo = null;
    },
    registerSuccess(state) {
      state.status.loggedIn = false;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
    }
  }
}
