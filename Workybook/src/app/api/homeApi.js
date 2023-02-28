import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// New worksheet list
// const newWorksheet = async (worksheetData) => {
//   const user = localStorage.getItem('user');
//   const authToken = JSON.parse(user)?.payload?.verification?.token;
//   const response = await axios.post(`${API_URL}/content/list`, worksheetData, {
//     headers: {
//       authorization: authToken
//     }
//   });
//   return response.data;
// };

// worksheet details
const worksheetDetails = async (worksheetId) => {
  const user = localStorage.getItem('user');
  const authToken = JSON.parse(user)?.payload?.verification?.token;
  const response = await axios.post(`${API_URL}/content/getBy/id`, worksheetId, {
    headers: {
      authorization: authToken
    }
  });
  return response.data;
};

// Subject list
const listSubject = async (subjectData) => {
  const user = localStorage.getItem('user');
  const authToken = JSON.parse(user)?.payload?.verification?.token;
  const response = await axios.post(`${API_URL}/subject/list`, subjectData, {
    headers: {
      authorization: authToken
    }
  });
  return response.data;
};

const getSubGradeAndId = async (subjectData) => {
  const user = localStorage.getItem('user');
  const authToken = JSON.parse(user)?.payload?.verification?.token;
  const response = await axios.post(`${API_URL}/subject/getBy/id/and/grade`, subjectData, {
    headers: {
      authorization: authToken
    }
  });
  return response.data;
};

const getCommonCoreStandardGradeAndId = async (subjectData) => {
  const user = localStorage.getItem('user');
  const authToken = JSON.parse(user)?.payload?.verification?.token;
  const response = await axios.post(`${API_URL}/commonCoreStandard/getBy/id/and/grade`, subjectData, {
    headers: {
      authorization: authToken
    }
  });
  return response.data;
};
// CCS list
const listCCL = async (ccsData) => {
  const user = localStorage.getItem('user');
  const authToken = JSON.parse(user)?.payload?.verification?.token;
  const response = await axios.post(`${API_URL}/commonCoreStandard/list`, ccsData, {
    headers: {
      authorization: authToken
    }
  });
  return response.data;
};

// Like Worksheet
const likeWorksheet = async (worksheet) => {
  const user = localStorage.getItem('user');
  const authToken = JSON.parse(user)?.payload?.verification?.token;
  const response = await axios.put(`${API_URL}/content/like/${worksheet?.id}`, worksheet?.status, {
    headers: {
      authorization: authToken
    }
  });
  return response.data;
};

const homeAPI = {
  // newWorksheet,
  listSubject,
  listCCL,
  worksheetDetails,
  likeWorksheet,
  getSubGradeAndId,
  getCommonCoreStandardGradeAndId
};

export default homeAPI;
