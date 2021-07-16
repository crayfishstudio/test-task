import Vue from 'vue'
import Vuex from 'vuex'
import search from './modules/search.js'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    search
  }
});
