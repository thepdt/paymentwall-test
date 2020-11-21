import { ActionTree } from 'vuex';
import { PAYMENT as paymentTypes } from '../mutation_types';
import { IPayment } from '@Types/modules/payment';
import { IRootState } from '@Types/store';
import { showError } from 'src/boot/utils';
import { uid } from 'quasar';
import paymentApi from '../../api/paymentApi';

const actions: ActionTree<IPayment, IRootState> = {
  async getGeolocation({ commit, dispatch }) {
    try {
      const params = { key: process.env.PRODUCT_KEY, uid: uid() };
      const { data }: any = await paymentApi.getGeolocation(params);
      commit(paymentTypes.SET_GEOLOCATION, data.code);
      dispatch('getPaymentMethodList', data.code);
      return Promise.resolve(data.code);
    } catch (error) {
      showError('Load geolocation failed!');
      return Promise.reject(error);
    }
  },

  async setGeolocation({ commit, dispatch }, countryCode: string) {
    try {
      commit(paymentTypes.SET_GEOLOCATION, countryCode);
      await dispatch('getPaymentMethodList', countryCode);
      return Promise.resolve(countryCode);
    } catch (error) {
      showError('Load geolocation failed!');
      return Promise.reject(error);
    }
  },

  async getPaymentMethodList({ commit }, countryCode: string) {
    try {
      const params = {
        key: process.env.PRODUCT_KEY,
        countryCode: countryCode
      };

      const { data }: any = await paymentApi.getPaymentMethodList(params);
      commit(paymentTypes.SET_PAYMENT_METHOD_LIST, data);
      if (data[0]) commit(paymentTypes.SELECT_PAYMENT_METHOD, data[0]);
      return Promise.resolve(data);
    } catch (error) {
      showError('Load payment method list failed!');
      return Promise.reject(error);
    }
  },

  selectPaymentMethod({ commit }, paymentMethod: any) {
    commit(paymentTypes.SELECT_PAYMENT_METHOD, paymentMethod);
  }
};

export default actions;
