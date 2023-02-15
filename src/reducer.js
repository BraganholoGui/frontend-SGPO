import {
    LOADING
  } from '../reducersType';
  
  const INITIAL_STATE = {
    isLoading: false
  };
  
  export default (state = INITIAL_STATE, action = {type:'', payload:''}) => {
    switch (action.type) {
    case LOADING:
      return { ...state, isLoading: action.payload };
    default:
      return state;
    }
  };
  