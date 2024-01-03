import { combineReducers } from 'redux'
import errors from './errors.ts'
import itemDetails from './itemDetails.ts'
import listItems from './listItems.ts'
import user from './user.ts'

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  // contains registrationMessage and loginMessage
  errors,
  // will have an id and username if someone is logged in
  user,
  listItems,
  itemDetails,
})

export default rootReducer
