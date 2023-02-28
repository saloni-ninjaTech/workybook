import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = process.env.REACT_APP_API_URL;

// getCollections
// getCollection
// getFavoriteCollection
// createCollection done
// updateCollection done
// deleteCollection

const getCollections = async (data) => {
  const user = localStorage.getItem('user');
  const authToken = JSON.parse(user)?.payload?.verification?.token;
  const response = await axios.post(`${API_URL}/collection/list`, data, {
    headers: {
      authorization: authToken
    }
  });
  return response.data;
};

const getFavoriteCollections = async () => {
  const user = localStorage.getItem('user');
  const authToken = JSON.parse(user)?.payload?.verification?.token;
  const response = await axios.get(`${API_URL}/content/favoriteList`, {
    headers: {
      authorization: authToken
    }
  });
  return response.data;
};

const getCollection = async (data) => {
  const user = localStorage.getItem('user');
  const authToken = JSON.parse(user)?.payload?.verification?.token;
  const response = await axios.post(`${API_URL}/collection/getBy/id`, data, {
    headers: {
      authorization: authToken
    }
  });
  return response.data.collection;
};

const createCollection = async (data) => {
  const user = localStorage.getItem('user');
  const authToken = JSON.parse(user)?.payload?.verification?.token;
  const response = await axios.post(`${API_URL}/collection`, data, {
    headers: {
      authorization: authToken
    }
  });
  toast.success(response.data.message);
  return response.data;
};

const updateCollection = async (data) => {
  const user = localStorage.getItem('user');
  const authToken = JSON.parse(user)?.payload?.verification?.token;
  const body = {
    favorite: false,
    content: data.content,
    collection: data.collection
  };
  const response = await axios.put(`${API_URL}/collection/${data.collectionId}`, body, {
    headers: {
      authorization: authToken
    }
  });
  toast.success(response.data.message);
  return response.data;
};

const updateCollectionLike = async (data) => {
  const user = localStorage.getItem('user');
  const authToken = JSON.parse(user)?.payload?.verification?.token;
  const response = await axios.put(`${API_URL}/collection/${data.collectionId}`, data, {
    headers: {
      authorization: authToken
    }
  });
  return response.data;
};

const collectionAPI = {
  getCollections,
  getFavoriteCollections,
  getCollection,
  createCollection,
  updateCollection,
  updateCollectionLike
};

export default collectionAPI;
