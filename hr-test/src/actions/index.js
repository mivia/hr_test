import axios from 'axios';

import { EMPLOYEE_STATUSES } from '../constants';

const HOST = 'http://localhost:3001';

export const ACTIONS = {
  ADD_EMPLOYEES: 'ADD_EMPLOYEES',
  ADD_EMPLOYEE: 'ADD_EMPLOYEE',
  INCHECK_EMPLOYEE: 'INCHECK_EMPLOYEE',
  APPROVE_EMPLOYEE: 'APPROVE_EMPLOYEE',
  ACTIVATE_EMPLOYEE: 'ACTIVATE_EMPLOYEE',
  INACTIVATE_EMPLOYEE: 'INACTIVATE_EMPLOYEE',
}

const addEmployees = (employees) => ({
  type: ACTIONS.ADD_EMPLOYEES,
  employees,
})

export const getEmployees = () => async dispatch => {
  try {
    const url = `${HOST}/employees`;
    const response = await axios.get(url)

    dispatch(addEmployees(response.data));
  } catch (error) {
    console.error(error);
  }
}

export const addEmployee = (employeeId) => async dispatch => {
  try {
    const url = `${HOST}/employees/${employeeId}`;
    const status = EMPLOYEE_STATUSES.ADDED;
    await axios.patch(url, { status })

    dispatch({
      type: ACTIONS.ADD_EMPLOYEE,
      employeeId,
      status,
    });
  } catch (error) {
    console.error(error);
  }
}

export const inCheckEmployee = (employeeId) => async dispatch => {
  try {
    const status = EMPLOYEE_STATUSES.INCHECK;
    const url = `${HOST}/employees/${employeeId}`;
    await axios.patch(url, { status })

    dispatch({
      type: ACTIONS.INCHECK_EMPLOYEE,
      employeeId,
      status,
    });
  } catch (error) {
    console.error(error);
  }
}

export const approveEmployee = (employeeId) => async dispatch => {
  try {
    const status = EMPLOYEE_STATUSES.APPROVED;
    const url = `${HOST}/employees/${employeeId}`;
    await axios.patch(url, { status })

    dispatch({
      type: ACTIONS.APPROVE_EMPLOYEE,
      employeeId,
      status
    });
  } catch (error) {
    console.error(error);
  }
}

export const activateEmployee = (employeeId) => async dispatch => {
  try {
    const status = EMPLOYEE_STATUSES.ACTIVE;
    const url = `${HOST}/employees/${employeeId}`;
    await axios.patch(url, { status })

    dispatch({
      type: ACTIONS.ACTIVATE_EMPLOYEE,
      employeeId,
      status
    });
  } catch (error) {
    console.error(error);
  }
}

export const inActivateEmployee = (employeeId) => async dispatch => {
  try {
    const status = EMPLOYEE_STATUSES.INACTIVE;
    const url = `${HOST}/employees/${employeeId}`;
    await axios.patch(url, { status })

    dispatch({
      type: ACTIONS.INACTIVATE_EMPLOYEE,
      employeeId,
      status
    });
  } catch (error) {
    console.error(error);
  }
}