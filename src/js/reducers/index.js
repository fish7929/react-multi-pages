import { combineReducers } from 'redux';
import postIssues from './postIssues';
// import objectAssign from 'object-assign';
// import { FETCH_ISSUES, RECEIVE_ISSUES } from '../constants/ActionTypes.js';
// import { fetchIssues, receiveIssues } from '../actions/index.js';

// var defaultIssuesState = {
//   isFetching: false,
//   items: []
// };

// // issues reducer
// function postIssues(state = defaultIssuesState, action) {
//   switch (action.type) {
//     case FETCH_ISSUES:
//       // 获取issues
//       return objectAssign({}, state, {
//         isFetching: true
//       });

//     case RECEIVE_ISSUES:
//       // 接收issues
//       return objectAssign({}, state, {
//         isFetching: false,
//         items: action.posts
//       });

//     default:
//       return state;
//   }
// }

// export default postIssues;
const rootReducer = combineReducers({
  postIssues
});

export default rootReducer;

