import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = process.env.REACT_APP_API_URL;

const register = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/register`, userData);
  return response.data;
};
const resendVerificationMail = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/resend-verification-email`, userData);
  return response.data;
};

const verifyEmail = async (id) => {
  const response = await axios.post(`${API_URL}/auth/verify-email`, id, {
    headers: {
      authorization: id
    }
  });
  if (await response.data) {
    localStorage.setItem('user', JSON.stringify(await response.data));
  }
  return response.data;
};

const reVerifyEmail = async (id) => {
  const response = await axios.post(`${API_URL}/auth/resend-verification-email`, id, {
    headers: {
      authorization: id
    }
  });
  if (await response.data) {
    localStorage.setItem('user', JSON.stringify(await response.data));
  }
  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/login`, userData);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};
const googleLogin = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/loginWithGoogle`, userData);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};
const googleRegister = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/registerWithGoogle`, userData);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};
const forgotPassword = async (emailId) => {
  const response = await axios.post(`${API_URL}/auth/forgot-password`, emailId);
  toast.success(response?.data?.message);
  return response.data;
};

const resetPassword = async (data) => {
  const { id, pass } = data;
  const response = await axios.post(`${API_URL}/auth/reset-password`, pass, {
    headers: {
      authorization: id
    }
  });
  if (id && pass) {
    toast.success(response?.data?.message);
  }
  return response.data;
};

const logout = () => {
  // localStorage.clear();
  localStorage.removeItem('user');
};

const authAPI = {
  register,
  login,
  forgotPassword,
  resetPassword,
  logout,
  verifyEmail,
  googleLogin,
  googleRegister,
  resendVerificationMail
};

export default authAPI;
