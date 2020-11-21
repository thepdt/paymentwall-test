import { GetterTree } from 'vuex';
import { IRootState } from '@Types/store';
import { IPayment } from '@Types/modules/payment';

const getters: GetterTree<IPayment, IRootState> = {};

export default getters;
