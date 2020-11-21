import Vue from 'vue';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.PAYMENT_API_ENDPOINT
});

Vue.prototype.$axios = axios;

export { axiosInstance };
