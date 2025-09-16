// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './components/common/Header/AuthContext' // 1. AuthProvider 임포트

import { GoogleOAuthProvider } from '@react-oauth/google'

ReactDOM.createRoot(document.getElementById('root')).render(
   <Provider store={store}>
      {/* <StrictMode> */}
      <BrowserRouter>
         <AuthProvider>
            <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
               {' '}
               {/* Replace with your Google Client ID */}
               <App />
            </GoogleOAuthProvider>
         </AuthProvider>
         {/* </StrictMode> */}
      </BrowserRouter>
   </Provider>
)
