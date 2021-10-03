import axios from 'axios';
import ApiEndPoint from './endPoints';

const defaults = {
  headers: () => ({
    'Content-Type': 'application/json',
    Accept: 'application/vnd.github.v3+json',
  }),
  error: 503,
};

const api = (method, url, variables) =>
  new Promise((resolve, reject) => {
    axios({
      url: `${ApiEndPoint.BASE_URL}${url}`,
      method,
      headers: defaults.headers(),
      params: method === 'get' ? variables : undefined,
      data: method !== 'get' ? variables : undefined,
      mode: 'no-cors',
    }).then(
      (response) => {
        resolve(response.data);
      },
      (error) => {
        if ([403, 503, 422, 304, 404].includes(error?.response?.status)) {
          reject(error?.response?.status);
        } else {
          reject(defaults.error);
        }
      }
    );
  });

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  get: (...args) => api('get', ...args),
  post: (...args) => api('post', ...args),
  put: (...args) => api('put', ...args),
  patch: (...args) => api('patch', ...args),
  delete: (...args) => api('delete', ...args),
};
