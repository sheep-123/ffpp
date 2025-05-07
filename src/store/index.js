import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        // Define your application-level state here
    },
    mutations: {
        // Define your synchronous state modification methods here
    },
    actions: {
        // Define your asynchronous operations here
    },
    getters: {
        // Define your state-derived properties here
    },
    modules: {
        user
    }
});

export default store;