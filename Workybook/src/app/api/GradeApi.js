import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const fetchGrades = async () => {
  const user = localStorage.getItem('user');
  const authToken = JSON.parse(user)?.payload?.verification?.token;
  const response = await axios.post(`${API_URL}/grade/list`, {
    headers: {
      authorization: authToken
    }
  });
  return response.data;
};

const studentAPI = {
  fetchGrades
};

export default studentAPI;
