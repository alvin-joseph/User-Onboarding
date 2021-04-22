import axios from 'axios'
import React, { useState, useEffect } from 'react'
import * as yup from 'yup'

import Form from './Form'
import schema from '../validation/formSchema'
import './App.css';


const initialFormValues = { //you must first initialize the form with these values that way you can change them to blank after every input
  name: '',
  email: '',
  role: '',
  password: '',
  terms: false,
}

const initialFormErrors = {
  name: '',
  email: '',
  role: '',
  password: '',
  terms: false,
}

const initialUsers = []
const initialDisabled = true

function App() {
  const [users, setUsers] = useState(initialUsers)          // array of friend objects
  const [formValues, setFormValues] = useState(initialFormValues) // object
  const [formErrors, setFormErrors] = useState(initialFormErrors) // object
  const [disabled, setDisabled] = useState(initialDisabled)       // boolean

  const postNewUsers = user => {
    axios
    .post('https://reqres.in/api/users', user)
    .then(res => {
      setUsers([res.data, ...users])
      setFormValues(initialFormValues);
    })
    .catch(err => {
      console.log(err);
    })
  }

  useEffect(() => {
    schema.isValid(formValues).then(valid => { //isValid is coming from yup. It validates everything. We can change a .then because it returns a promise. Then it will enable the submit button.
      setDisabled(!valid)
    })
  }, [formValues])

  const inputChange = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then(() => {
        setFormErrors({...formErrors,[name]: "",});
      })
      .catch(err => {
        setFormErrors({...formErrors, [name]: err.errors[0],
        });
      });

    setFormValues({...formValues, [name]: value})
  }

  const submitForm = () => {
    const newUser = {
      name: formValues.name.trim(),
      role: formValues.role.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      terms: formValues.terms,
    }

    postNewUsers(newUser); //posting the typed user to the api
  }

  return (
    <div className="container">
      <header className="App-header">
        <h1>User Onboarding App</h1>
      </header>
      <Form 
      values={formValues}
      change={inputChange}
      submit={submitForm}
      disabled={disabled}
      errors={formErrors}
      />
        {users.map((user, i) => {
          return (
            <div key={i} className='team container'>
              <h2>Name: {user.name}</h2>
              <br/>
              <p>Role: {user.role}</p>
              <br/>
              <p>Email: {user.email}</p>
              <br/>
              <p>Password: ******* </p>
            </div>
          )
        })}
        
    </div>
  );
}

export default App;
