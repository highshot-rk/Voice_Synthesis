import { combineReducers } from 'redux';
import { authentication } from './authentication.reducer';
import { alert } from './alert.reducer';
import { homepageContents } from './home.reducer'

const rootReducer = combineReducers({
  authentication,
  homepageContents,
  alert
});

export default rootReducer;