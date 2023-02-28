import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const createClass = async (classData) => {
  const user = localStorage.getItem('user');
  const authToken = JSON.parse(user)?.payload?.verification?.token;
  const response = await axios.post(`${API_URL}/classroom`, classData, {
    headers: {
      authorization: authToken
    }
  });
  return response.data;
};

const editClass = async (data) => {
  const user = localStorage.getItem('user');
  const authToken = JSON.parse(user)?.payload?.verification?.token;
  const response = await axios.put(`${API_URL}/classroom/${data.classId}`, data.values, {
    headers: {
      authorization: authToken
    }
  });
  return response.data;
};

const getGoogleClassRoomData = async (data) => {
  const user = localStorage.getItem('user');
  const gTOkenParse = localStorage.getItem('gToken');
  const authToken = JSON.parse(user)?.payload?.verification?.token;
  const gToken = JSON.parse(gTOkenParse)?.accessToken;

  const response = await axios.post(`${API_URL}/classroom/googleClassroom`, {
    access_token: gToken
  }, {
    headers: {
      authorization: authToken
      // access_token: gToken
    }
  });
  return response.data;
};
const getGoogleClassRoomDatainsert = async (data) => {
  const user = localStorage.getItem('user');
  const gTOkenParse = localStorage.getItem('gToken');
  const authToken = JSON.parse(user)?.payload?.verification?.token;
  const gToken = JSON.parse(gTOkenParse)?.accessToken;
  const reqData = {
    ...data
  };
  reqData.access_token = gToken;
  const response = await axios.post(`${API_URL}/classroom/importGoogleClassroom`, reqData, {
    headers: {
      authorization: authToken
      // access_token: gToken
    }
  });
  return response.data;
};

const classRoomExcelDataImport = async (data) => {
  const user = localStorage.getItem('user');
  const authToken = JSON.parse(user)?.payload?.verification?.token;
  const response = await axios.post(`${API_URL}/classroom/importClassroom`, data, {
    headers: {
      authorization: authToken
    }
  });
  return response.data;
};

// const getClassRoomOptions = async () => {
// const user = localStorage.getItem('user');
// const authToken = JSON.parse(user)?.payload?.verification?.token;
//   const response = await axios.get(`${API_URL}/classroom/optionList`, {
//     headers: {
//       authorization: authToken
//     }
//   });
//   return response.data;
// };

const getClassrooms = async (data) => {
  const user = localStorage.getItem('user');
  const authToken = JSON.parse(user)?.payload?.verification?.token;
  const response = await axios.post(`${API_URL}/classroom/list`, data, {
    headers: {
      authorization: authToken
    }
  });
  return response.data;
};

const getClassroom = async (id) => {
  const user = localStorage.getItem('user');
  const authToken = JSON.parse(user)?.payload?.verification?.token;
  const response = await axios.post(
    `${API_URL}/classroom/getBy/id`,
    {
      id
    },
    {
      headers: {
        authorization: authToken
      }
    }
  );
  return response.data;
};

const classroomAPI = {
  createClass,
  editClass,
  // getClassRoomOptions
  getClassrooms,
  getClassroom,
  getGoogleClassRoomData,
  getGoogleClassRoomDatainsert,
  classRoomExcelDataImport
};

export default classroomAPI;
