import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'

import 'bootstrap/dist/css/bootstrap.min.css'
import './style/index.css'

import { Provider } from 'react-redux' // the react bindings library
import store from './redux/store'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)

// Provider is a component we're taking from react-redux, the bindings library for a React Application!
// we're going to wrap our main component, App, into it!
// Provider doesn't affect the visuals of the Application, just enables the Redux Store
