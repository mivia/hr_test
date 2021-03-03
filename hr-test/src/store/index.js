import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { ACTIONS } from '../actions';

import thunk from 'redux-thunk';

// Reducers
export const employees = (state = [], action) => {
  switch (action.type) {
    case ACTIONS.ADD_EMPLOYEES:
      return action.employees;
    case ACTIONS.ADD_EMPLOYEE:
    case ACTIONS.INCHECK_EMPLOYEE:
    case ACTIONS.APPROVE_EMPLOYEE:
    case ACTIONS.ACTIVATE_EMPLOYEE:
    case ACTIONS.INACTIVATE_EMPLOYEE:
      const { status, employeeId } = action;
      return state.map(employee => {
        if(employee.id === employeeId) {
          employee.status = status;
        }
        return employee;
    })
    default:
      return state;
  }
};

export const reducers = combineReducers({ employees });

// Store
export function configureStore(initialState = {}) {
  const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(thunk)));

  return store;
}

export const store = configureStore();