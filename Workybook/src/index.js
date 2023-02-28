import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { PersistGate } from 'redux-persist/integration/react';
import persistStore from 'redux-persist/es/persistStore';
import { store } from './app/store';
import App from './App';
// styles
import './styles.less';

const persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root'));
window.document.title = 'Workybooks App — Home';
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <App />
      </GoogleOAuthProvider>
    </PersistGate>
  </Provider>
  // </React.StrictMode>
);
