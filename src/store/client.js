import axios from 'axios';
import Vue from 'vue';

let headers = Vue.prototype.$authLock.headers();

console.log(headers);

const instance = axios.create({
  baseURL: 'https://odatav2.easefica.co.za/easefica/',
  timeout: 5000,
  headers: headers
});

export default instance;