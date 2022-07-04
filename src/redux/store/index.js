import { configureStore, combineReducers } from '@reduxjs/toolkit' // core/main redux library
import cartReducer from '../reducers/cart'
import userReducer from '../reducers/user'
import bookReducer from '../reducers/book'
// @reduxjs/toolkit is the CORE redux library!

// now we split up the reducer into multiple files
// each little reducer is aware just of itself
// how can all of them re-create the big reducer once again?

const bigReducer = combineReducers({
  cart: cartReducer,
  user: userReducer,
  book: bookReducer,
})
// with combineReducers I'm basically re-creating the structure I had in the beginning:
// const initialState = {
//   cart: {
//     content: [],
//   },
//   user: {
//     name: '',
//   },
// }

// in this way we achieved a structure that not only is better organized than before,
// with proper case division, but can also grow and scale gracefully!

const store = configureStore({
  // this configuration objects sets up the redux store
  reducer: bigReducer,
})

export default store

// now the redux store is up and running! ...but just in memory!
// we have to attach our React App to it!
