import {API_URL} from '../config/constants';

export function request(path, params) {
  return fetch(API_URL + path, params)
    .then(r => r.json())
    .then(r => r.data);
}