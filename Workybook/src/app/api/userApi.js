import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};
// register user
const getProfile = async (userId) => {
  const user = localStorage.getItem('user');
  const decodedJwt = JSON.parse(user);
  if (parseJwt(decodedJwt.payload.verification.token).exp * 1000 < Date.now()) {
    localStorage.removeItem('user');
  }
  const authToken = JSON.parse(user)?.payload?.verification?.token;
  const response = await axios.post(`${API_URL}/user/getBy/id`, userId);
  return response.data;
};

// login user
const updateProfile = async (userInfo) => {
  const user = localStorage.getItem('user');
  const authToken = JSON.parse(user)?.payload?.verification?.token;
  const response = await axios.put(`${API_URL}/user/${userInfo?.id}`, userInfo?.userDetail);
  return response.data;
};

const userAPI = {
  getProfile,
  updateProfile
};

export default userAPI;
