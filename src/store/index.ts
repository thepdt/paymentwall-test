import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { IRootState } from '@Types/store';

import payment from './payment';

Vue.use(Vuex);

const store: StoreOptions<IRootState> = {
  state: {
    author: 'ThepDT',
    version: '1.0.0'
  },
  modules: { payment },

  // enable strict mode (adds overhead!)
  // for dev mode only
  strict: process.env.NODE_ENV === 'development'
};

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default new Vuex.Store<IRootState>(store);
