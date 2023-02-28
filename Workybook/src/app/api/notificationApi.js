import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const getNotification = async (data) => {
  const user = localStorage.getItem('user');
  const authToken = JSON.parse(user)?.payload?.verification?.token;
  const res = await axios.post(`${API_URL}/notification/list`, data, {
    headers: {
      authorization: authToken
    }
  });
  return res.data;
};

const notificatonAPI = {
  getNotification
};

export default notificatonAPI;
