import axios from 'axios';
import { apiConfig } from '../apiKeys';

const { apiUrl } = apiConfig;

const getBabies = () => new Promise((resolve, reject) => {
  axios.get(`${apiUrl}/Babies/`).then((response) => resolve(response.data)).catch(reject);
});

const getSingleBaby = (id) => new Promise((resolve, reject) => {
  axios.get(`${apiUrl}/Babies/${id}`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const createBaby = (babyObj) => new Promise((resolve, reject) => {
  axios.post(`${apiUrl}/Babies`, babyObj).then((response) => resolve(response.data)).catch(reject);
});

const editBaby = (id, babyObj) => new Promise((resolve, reject) => {
  axios.put(`${apiUrl}/Babies/update/${id}`, babyObj).then(resolve).catch(reject);
});

const deleteBaby = (id) => new Promise((resolve, reject) => {
  axios.delete(`${apiUrl}/Babies/deleteBaby/${id}`).then(() => {
    getBabies().then(resolve).catch(reject);
  });
});

export {
  getBabies, getSingleBaby, createBaby, editBaby, deleteBaby
};