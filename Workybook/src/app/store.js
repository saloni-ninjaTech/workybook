import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './features/auth/authSlice';
import homeReducer from './features/home/homepageSlice';
import searchReducer from './features/search/searchpageSlice';
import userReducer from './features/user/userSlice';
import collectionReducer from './features/collection/collectionSlice';
import studentsReducer from './features/students/studentsSlice';
import classroomReducer from './features/classroom/classroomSlice';
import assignmentReducer from './features/assignment/assignmentSlice';
import gradesReducer from './features/grade/GradeSlice';
import modalReducer from './features/modal/modalSlice';
import worksheetsReducer from './features/worksheet/worksheetSlice';
import notificationReducer from './features/notification/notificationSlice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage
};

const rootReducer = combineReducers({
  auth: authReducer,
  home: homeReducer,
  search: searchReducer,
  user: userReducer,
  collection: collectionReducer,
  students: studentsReducer,
  classroom: classroomReducer,
  assignment: assignmentReducer,
  grades: gradesReducer,
  modal: modalReducer,
  worksheet: worksheetsReducer,
  notification: notificationReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: () => getDefaultMiddleware({
    immutableCheck: {
      ignoredPaths: ['items.data']
    },
    serializableCheck: false
  })
});
