import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getEmployees, addEmployee, inCheckEmployee, approveEmployee, activateEmployee, inActivateEmployee, ACTIONS, EMPLOYEE_STATUSES } from '../actions';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import './styles.scss';

function EmployeeList(props) {
  useEffect(() => {
    const { getEmployees } = props;

    getEmployees()
    //eslint-disable-next-line
  }, []);

  const handleActionChange = (event, employee, actionType) => {

    switch(actionType) {
      case ACTIONS.ADD_EMPLOYEE:
        props.addEmployee(employee.id)
        break;
      case ACTIONS.INCHECK_EMPLOYEE:
        props.inCheckEmployee(employee.id)
        break;
      case ACTIONS.APPROVE_EMPLOYEE:
        props.approveEmployee(employee.id)
        break;
      case ACTIONS.ACTIVATE_EMPLOYEE:
        props.activateEmployee(employee.id)
        break;
      case ACTIONS.INACTIVATE_EMPLOYEE:
        props.inActivateEmployee(employee.id)
        break;
      default: console.log('no action found')
    }
  }
  return (
    <div className="App">
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
            <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Surname</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {props.employees.map((employee) => (
                <TableRow key={employee.name}>
                  <TableCell component="th" scope="row">
                    {employee.name}
                  </TableCell>
                  <TableCell align="right">{employee.surname}</TableCell>
                  <TableCell align="right">{employee.status}</TableCell>
                  <TableCell align="right">
                    <ul className="breadcrumb">
                      <li><button onClick={(e) => handleActionChange(e, employee, ACTIONS.ADD_EMPLOYEE)} className={`${employee.status === EMPLOYEE_STATUSES.ADDED ? 'active' : ''}`}>Add</button></li>
                      <li><button onClick={(e) => handleActionChange(e, employee, ACTIONS.INCHECK_EMPLOYEE)} className={`${employee.status === EMPLOYEE_STATUSES.INCHECK ? 'active' : ''}`}>In-check</button></li>
                      <li><button onClick={(e) => handleActionChange(e, employee, ACTIONS.APPROVE_EMPLOYEE)} className={`${employee.status === EMPLOYEE_STATUSES.APPROVED ? 'active' : ''}`}>Approve</button></li>
                      <li><button onClick={(e) => handleActionChange(e, employee, ACTIONS.ACTIVATE_EMPLOYEE)} className={`${employee.status === EMPLOYEE_STATUSES.ACTIVE ? 'active' : ''}`}>Activate</button></li>
                      <li><button onClick={(e) => handleActionChange(e, employee, ACTIONS.INACTIVATE_EMPLOYEE)} className={`${employee.status === EMPLOYEE_STATUSES.INACTIVE ? 'active' : ''}`}>Inactivate</button></li>
                    </ul>
                  </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    </div>
  );
}

EmployeeList.propTypes = {
  getEmployees: PropTypes.func.isRequired,
  addEmployee: PropTypes.func.isRequired,
  inCheckEmployee: PropTypes.func.isRequired,
  approveEmployee: PropTypes.func.isRequired,
  activateEmployee: PropTypes.func.isRequired,
  inActivateEmployee: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => ({ employees: state.employees });
const mapDispatchToProps = { getEmployees, addEmployee, inCheckEmployee, approveEmployee, activateEmployee, inActivateEmployee };

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeList);