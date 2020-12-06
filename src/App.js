import logo from './ibm-logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const[firstName, setFirstName] = useState("");
  const[lastName, setLastName] = useState("");
  const[hireDate, setHireDate] = useState(Date);
  const[role, setRole] = useState("");
  const[listOfEmployees, setListOfEmployees] = useState([]);

  // function to add the employee
  const addEmployee = () =>{
    //alert(firstName + lastName + hireDate + role);
    axios.post('/api/employees',
    {firstName: firstName, lastName:lastName, hireDate:hireDate,role:role})
          .then((response) => {
            alert(response.data);
          }).catch((response) => {
            alert(response);
          });
  };

  // display the employee list
  useEffect(()=>{
    axios.get('/api/employees')
          .then((response) => {
            setListOfEmployees(response.data);
          }).catch((response) => {
            console.log("ERR");
          });
  },[]);


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div className="Inputs">
        <div className="Employee">
          <h3> IBM Employee Records</h3>
        </div>
        <div className="Records">
        <h5> Create Employee Record </h5>
        <label> FirstName 
          <input  type="text" 
                  placeholder="firstName" 
                  onChange={ (event) =>{
                    setFirstName(event.target.value);
                  }}/>
        </label>
        <label> LastName 
          <input  type="text" 
                  placeholder="lastName" 
                  onChange={ (event) =>{
                    setLastName(event.target.value);
                  }}/>
        </label>
        <label> Hire Date  
          <input  type="date" 
                  placeholder="Hire Date" 
                  onChange={ (event) =>{
                    setHireDate(event.target.value);
                  }}/>
        </label>
        <label> User Role 
          <input  type="text" 
                  placeholder="Role" 
                  onChange={ (event) =>{
                    setRole(event.target.value);
                  }}/>
        </label>
        <button onClick ={addEmployee}> Add Employee</button>
        <div className="Display">
          <h5> Display Employee List </h5>
          <h6>FirstName  LastName  Role  Hiredate</h6>
          {listOfEmployees.map((value) => {
            return <div className="Values">{value.firstName}  {value.lastName}  {value.role} {value.hireDate} </div>
            
          })}
        </div>
        </div>
      </div>
    </div>
  );
}

export default App;
