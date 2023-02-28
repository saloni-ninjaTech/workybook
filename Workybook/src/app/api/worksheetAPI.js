import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const getWorksheetsByGrades = async (data) => {
  const user = localStorage.getItem('user');
  const authToken = JSON.parse(user)?.payload?.verification?.token;
  const response = await axios.post(`${API_URL}/content/list`, data, {
    headers: {
      authorization: authToken
    }
  });
  return response.data;
};

const getWorksheets = async (data) => {
  const user = localStorage.getItem('user');
  const authToken = JSON.parse(user)?.payload?.verification?.token;
  const response = await axios.post(`${API_URL}/content/list`, data, {
    headers: {
      authorization: authToken
    }
  });
  return response.data;
};

const getPopularWorksheets = async (data) => {
  const user = localStorage.getItem('user');
  const authToken = JSON.parse(user)?.payload?.verification?.token;
  const response = await axios.post(`${API_URL}/content/populateList`, data, {
    headers: {
      authorization: authToken
    }
  });
  return response.data;
};

const getRecentWorksheets = async () => {
  const user = localStorage.getItem('user');
  const authToken = JSON.parse(user)?.payload?.verification?.token;
  const response = await axios.get(`${API_URL}/content/recent/contentList`, {
    headers: {
      authorization: authToken
    }
  });
  return response.data;
};

const worksheetAPI = {
  getWorksheets,
  getPopularWorksheets,
  getRecentWorksheets,
  getWorksheetsByGrades
};

export default worksheetAPI;
