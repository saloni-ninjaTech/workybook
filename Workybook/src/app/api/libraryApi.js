// import axios from 'axios';

// const API_URL = process.env.REACT_APP_API_URL;

// Favorite list
// const favoriteData = async () => {
//   const user = localStorage.getItem('user');
//   const authToken = JSON.parse(user)?.payload?.verification?.token;
//   const response = await axios.get(`${API_URL}/content/favoriteList`, {
//     headers: {
//       authorization: authToken
//     }
//   });
//   return response.data;
// };

// My collection Details
// const collectionDetail = async (collectionId) => {
//   const user = localStorage.getItem('user');
//   const authToken = JSON.parse(user)?.payload?.verification?.token;
//   const response = await axios.post(`${API_URL}/collection/getBy/id`, collectionId, {
//     headers: {
//       authorization: authToken
//     }
//   });
//   return response.data.collection;
// };

// Recent list
// const recentList = async () => {
//   const user = localStorage.getItem('user');
//   const authToken = JSON.parse(user)?.payload?.verification?.token;
//   const response = await axios.get(`${API_URL}/content/recent/contentList`, {
//     headers: {
//       authorization: authToken
//     }
//   });
//   return response.data;
// };

const libraryAPI = {
  // favoriteData,
  // recentList
};

export default libraryAPI;
