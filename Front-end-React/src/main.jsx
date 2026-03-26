import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './output.css'
import { Provider } from 'react-redux'
import store from './store/index.js'
import {GoogleOAuthProvider} from '@react-oauth/google'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <Provider store={store}>
    <GoogleOAuthProvider clientId='622527416169-o52p3r9sli8a6kchm9k11fldn5ofvn5d.apps.googleusercontent.com'>
    <App />
    </GoogleOAuthProvider>
    </Provider>
    
  </StrictMode>,
)
