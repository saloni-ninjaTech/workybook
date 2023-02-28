import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const getAssignments = async (classId) => {
  const user = localStorage.getItem('user');
  const authToken = JSON.parse(user)?.payload?.verification?.token;
  const response = await axios.post(
    `${API_URL}/assignment/list`,
    {
      classId
    },
    {
      headers: {
        authorization: authToken
      }
    }
  );
  return response.data;
};

const getSubmittedAssignmentDetail = async (data) => {
  const user = localStorage.getItem('user');
  const authToken = JSON.parse(user)?.payload?.verification?.token;
  const response = await axios.post(`${API_URL}/submittedAssignment/getBy/student/assignment`, data, {
    headers: {
      authorization: authToken
    }
  });
  return response.data;
};

const getSubmittedAssignments = async (data) => {
  const user = localStorage.getItem('user');
  const authToken = JSON.parse(user)?.payload?.verification?.token;
  const response = await axios.post(`${API_URL}/submittedAssignment/getListBy/student`, data, {
    headers: {
      authorization: authToken
    }
  });
  return response.data;
};

const getAssignmentsByStatus = async (data) => {
  const user = localStorage.getItem('user');
  const authToken = JSON.parse(user)?.payload?.verification?.token;
  const response = await axios.post(`${API_URL}/assignment/getBy/status/list`, data, {
    headers: {
      authorization: authToken
    }
  });
  return response.data;
};

const getAssignmentsByStudent = async (studentId) => {
  const user = localStorage.getItem('user');
  const authToken = JSON.parse(user)?.payload?.verification?.token;
  const response = await axios.post(
    `${API_URL}/assignment/getBy/student`,
    {
      studentId
    },
    {
      headers: {
        authorization: authToken
      }
    }
  );
  return response.data;
};

const createAssignment = async (data) => {
  const user = localStorage.getItem('user');
  const authToken = JSON.parse(user)?.payload?.verification?.token;
  const response = await axios.post(`${API_URL}/assignment`, data, {
    headers: {
      authorization: authToken
    }
  });
  return response.data;
};

const updateAssignment = async (data) => {
  const user = localStorage.getItem('user');
  const authToken = JSON.parse(user)?.payload?.verification?.token;
  const response = await axios.put(
    `${API_URL}/assignment/${data.id}`, // assignment id
    data,
    {
      headers: {
        authorization: authToken
      }
    }
  );
  return response.data;
};

const getStudentAssignmentDetail = async (data) => {
  const user = localStorage.getItem('user');
  const authToken = JSON.parse(user)?.payload?.verification?.token;

  const response = await axios.post(`${API_URL}/assignment/studentsAssignmentDetails`, data, {
    headers: {
      authorization: authToken
    }
  });
  return response.data;
};

const getAssignmentGradeList = async (data) => {
  const user = localStorage.getItem('user');
  const authToken = JSON.parse(user)?.payload?.verification?.token;
  const response = await axios.post(`${API_URL}/assignmentGrade/list`, data, {
    headers: {
      authorization: authToken
    }
  });
  return response.data;
};

const updateGradeList = async (data) => {
  const user = localStorage.getItem('user');
  const authToken = JSON.parse(user)?.payload?.verification?.token;
  const response = await axios.put(`${API_URL}/submittedAssignment/grade/list`, data, {
    headers: {
      authorization: authToken
    }
  });
  return response.data;
};

const assignmentAPI = {
  getAssignments,
  getSubmittedAssignmentDetail,
  getAssignmentsByStatus,
  getAssignmentsByStudent,
  getSubmittedAssignments,
  getStudentAssignmentDetail,
  createAssignment,
  updateAssignment,
  getAssignmentGradeList,
  updateGradeList
};

export default assignmentAPI;
