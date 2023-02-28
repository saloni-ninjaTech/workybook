import moment from 'moment';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import assignmentAPI from '../../api/assignmentAPI';

export const getAssignments = createAsyncThunk('assignment/getAssignments', async (data, thunkAPI) => {
  try {
    const response = await assignmentAPI.getAssignments(data);
    return response;
  } catch (error) {
    const message = error?.response?.data?.message;
    return thunkAPI.rejectWithValue(message);
  }
});

export const getSubmittedAssignmentDetail = createAsyncThunk('assignment/getSubmittedAssignmentDetail', async (data, thunkAPI) => {
  try {
    const response = await assignmentAPI.getSubmittedAssignmentDetail(data);
    return response;
  } catch (error) {
    const message = error?.response?.data?.message;
    return thunkAPI.rejectWithValue(message);
  }
});

export const getSubmittedAssignments = createAsyncThunk('assignment/getSubmittedAssignments', async (data, thunkAPI) => {
  try {
    const response = await assignmentAPI.getSubmittedAssignments(data);
    return response;
  } catch (error) {
    const message = error?.response?.data?.message;
    return thunkAPI.rejectWithValue(message);
  }
});

export const getAssignmentsByStatus = createAsyncThunk('assignment/getAssignmentsByStatus', async (data, thunkAPI) => {
  try {
    const response = await assignmentAPI.getAssignmentsByStatus(data);
    return response;
  } catch (error) {
    const message = error?.response?.data?.message;
    return thunkAPI.rejectWithValue(message);
  }
});

export const getAssignmentsByStudent = createAsyncThunk('assignment/getAssignmentsByStudent', async (data, thunkAPI) => {
  try {
    const response = await assignmentAPI.getAssignmentsByStudent(data);
    return response;
  } catch (error) {
    const message = error?.response?.data?.message;
    return thunkAPI.rejectWithValue(message);
  }
});
export const getStudentAssignmentDetail = createAsyncThunk('assignment/getStudentAssignmentDetail', async (data, thunkAPI) => {
  try {
    const response = await assignmentAPI.getStudentAssignmentDetail(data);
    return response;
  } catch (error) {
    const message = error?.response?.data?.message;
    return thunkAPI.rejectWithValue(message);
  }
});

export const updateAssignment = createAsyncThunk('assignment/updateAssignment', async (data, thunkAPI) => {
  try {
    const response = await assignmentAPI.updateAssignment(data);
    toast.success(response.message);
    return response;
  } catch (error) {
    const message = error?.response?.data?.message;
    toast.error(message);
    return thunkAPI.rejectWithValue(message);
  }
});

export const createAssignment = createAsyncThunk('assignment/createAssignment', async (data, thunkAPI) => {
  try {
    const response = await assignmentAPI.createAssignment(data);
    toast.success(response?.message);
    return response;
  } catch (error) {
    const message = error?.response?.data?.message;
    toast.error(message);
    return thunkAPI.rejectWithValue(message);
  }
});

export const getAssignmentGradeList = createAsyncThunk('assignment/getAssignmentGradeList', async (data, thunkAPI) => {
  try {
    const response = await assignmentAPI.getAssignmentGradeList();
    return response;
  } catch (error) {
    const message = error?.response?.data?.message;
    return thunkAPI.rejectWithValue(message);
  }
});

export const updateGradeList = createAsyncThunk('assignment/updateGradeList', async (data, thunkAPI) => {
  try {
    const response = await assignmentAPI.updateGradeList(data);
    return response;
  } catch (error) {
    const message = error?.response?.data?.message;
    return thunkAPI.rejectWithValue(message);
  }
});

export const assignmentSlice = createSlice({
  name: 'assignment',
  initialState: {
    assignments: null,
    assignmentsByStatus: [],
    assignmentsByStudents: [],
    studentAssignmentDetail: [],
    studentAssignmentReportJson: [],
    submittedAssignments: [],
    submittedAssignmentDetail: [],
    assignmentGradeList: [],
    status: '',
    currentStep: 0,
    assignCollectionCurrentStep: 0,
    currentAssignment: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: null,
    viewWorkPageCount: 1
  },
  reducers: {
    setViewWorkPageCount(state, action) {
      state.viewWorkPageCount = action.payload;
    },
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    setAssignCollectionCurrentStep: (state, action) => {
      state.assignCollectionCurrentStep = action.payload;
    },
    setAssignment(state, action) {
      state.currentAssignment = action.payload;
    },
    resetAssignment(state) {
      state.currentAssignment = null;
    },
    setStatus(state, action) {
      state.status = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAssignments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAssignments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.assignments = action.payload.list;
      })
      .addCase(getAssignments.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getSubmittedAssignments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSubmittedAssignments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.submittedAssignments = action.payload;
      })
      .addCase(getSubmittedAssignments.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAssignmentsByStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAssignmentsByStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.assignments = action.payload.assignment;
      })
      .addCase(getAssignmentsByStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAssignmentsByStudent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAssignmentsByStudent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.assignmentsByStudents = action.payload;
      })
      .addCase(getAssignmentsByStudent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createAssignment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAssignment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.currentAssignment = action.payload;
      })
      .addCase(createAssignment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateAssignment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAssignment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.currentAssignment = action.payload;
      })
      .addCase(updateAssignment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getSubmittedAssignmentDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSubmittedAssignmentDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.submittedAssignmentDetail = action.payload;
      })
      .addCase(getSubmittedAssignmentDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getStudentAssignmentDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStudentAssignmentDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.studentAssignmentDetail = action.payload;
        // eslint-disable-next-line no-unsafe-optional-chaining
        const { assignmentScore } = action?.payload?.studentsAssignmentData;
        let newJsonData = [];
        if (assignmentScore) {
          assignmentScore.forEach((data) => {
            const totalQuestions = (data?.totalCorrectAnswer || 0) + (data?.totalWrongAnswer || 0) + (data?.totalBlankAnswer || 0);
            const newObject = {
              studentName: data?.student_name,
              submittedDate: data?.submittedDate ? moment(data?.submittedDate).format('DD/MM/YYYY hh:mm a') : 'N/A',
              time: data?.time || 'N/A',
              totalCorrectAnswer: data?.totalCorrectAnswer,
              totalWrongAnswer: data?.totalWrongAnswer,
              totalBlankAnswer: data?.totalBlankAnswer,
              averagePercentage: data?.averagePercentage,
              assignmentGrade: data?.assignmentGrades?.[0]?.title,
              assignmentGradeColor: data?.assignmentGrades?.[0]?.color,
              totalQuestions
            };
            newJsonData = [...newJsonData, newObject];
          });
        }
        state.studentAssignmentReportJson = newJsonData;
      })
      .addCase(getStudentAssignmentDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.studentAssignmentDetail = [];
        state.studentAssignmentReportJson = [];
      })
      .addCase(getAssignmentGradeList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAssignmentGradeList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.assignmentGradeList = action.payload;
      })
      .addCase(getAssignmentGradeList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateGradeList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateGradeList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(updateGradeList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  }
});

export const { setAssignment, setStatus, setCurrentStep, resetAssignment, setViewWorkPageCount, setAssignCollectionCurrentStep } = assignmentSlice.actions;
export default assignmentSlice.reducer;
