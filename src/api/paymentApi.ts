import { axiosInstance } from '@Boot/axios';

const planApi = {
  getGeolocation: (params: any) =>
    axiosInstance.request({
      url: '/rest/country',
      method: 'GET',
      params
    }),

  getPaymentMethodList: (params: any) =>
    axiosInstance.request({
      url: '/payment-systems',
      method: 'GET',
      params
    })
};

export default planApi;
