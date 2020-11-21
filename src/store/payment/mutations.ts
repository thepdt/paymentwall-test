import { MutationTree } from 'vuex';
import { PAYMENT as paymentTypes } from '../mutation_types';
import { IPayment } from '@Types/modules/payment';

const mutations: MutationTree<IPayment> = {
  [paymentTypes.SET_GEOLOCATION](state, selectedCountry: string) {
    state.selectedCountry = selectedCountry;
  },

  [paymentTypes.SET_PAYMENT_METHOD_LIST](state, paymentMethodList: any[]) {
    state.paymentMethodList = paymentMethodList;
  },

  [paymentTypes.SELECT_PAYMENT_METHOD](state, selectedPaymentMethod: any) {
    state.selectedPaymentMethod = selectedPaymentMethod;
  }
};

export default mutations;
