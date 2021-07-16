import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

export default {
  state: {
    packages: []
  },
  actions: {
    async searchPackages(ctx, searchPhrase) {
      axios
      .get('https://registry.npmjs.org/-/v1/search?size=100&text=' + searchPhrase)
      .then(response => (
        ctx.commit('updateSearch', response.data.objects)
      ));
    },
  },
  mutations: {
    updateSearch(state, payload) {
      state.packages = payload;
    }
  },
  getters: {
    allPackages(state) {
      return state.packages;
    }
  }
}
