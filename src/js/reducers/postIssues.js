// import { combineReducers } from 'redux';
import objectAssign from 'object-assign';
import { REQUEST_ISSUES, RECEIVE_ISSUES } from '../constants/ActionTypes.js';
import { fetchIssues, receiveIssues } from '../actions/index.js';

var initialState = {
  isFetching: false,
  items: []
};

// issues reducer
function postIssues(state = initialState, action) {
  switch (action.type) {
    case REQUEST_ISSUES:
      // 获取issues
      return objectAssign({}, state, {
        isFetching: true
      });

    case RECEIVE_ISSUES:
      // 接收issues
      return objectAssign({}, state, {
        isFetching: false,
        items: action.posts
      });

    default:
      return state;
  }
}

export default postIssues;

