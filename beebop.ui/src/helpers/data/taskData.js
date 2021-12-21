import axios from 'axios';
import { apiConfig } from '../apiKeys';

const { apiUrl } = apiConfig;

const getTasks = () => new Promise((resolve, reject) => {
  axios.get(`${apiUrl}/Tasks/`).then((response) => resolve((response.data))).catch(reject);
});

const getSingleTask = (id) => new Promise((resolve, reject) => {
  axios.get(`${apiUrl}/Tasks/${id}`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const getBabyTask = (babyId) => new Promise((resolve, reject) => {
  axios.get(`${apiUrl}/Tasks/babies/${babyId}`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const createTask = (taskObj) => new Promise((resolve, reject) => {
  axios.post(`${apiUrl}/Tasks`, taskObj).then((response) => resolve(response.data)).catch(reject);
});

const editTask = (id, taskObj) => new Promise((resolve, reject) => {
  axios.put(`${apiUrl}/Tasks/update/${id}`, taskObj).then(() => {
    getSingleTask(id).then(resolve).catch(reject);
  });
});

const deleteTask = (id) => new Promise((resolve, reject) => {
  axios.delete(`${apiUrl}/Tasks/deleteTask/${id}`).then(() => {
    getTasks().then(resolve).catch(reject);
  });
});

export {
  getTasks, getSingleTask, getBabyTask, createTask, editTask, deleteTask
};
