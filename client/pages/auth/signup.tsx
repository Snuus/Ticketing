import { NextPage } from 'next';
import React from 'react'
import { useState } from 'react'
import axios from 'axios'

const Signup: NextPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<any[]>([])

  const onSubmit = async (event: React.FormEvent) => {
    try {
      event.preventDefault()
      const response = await axios.post('/api/users/signup', {
        email, password
      })
    } catch (err: any) {
      setErrors(err.response.data.errors)

    }

  }


  return (
    <form>
      <h1>Signup</h1>
      <div className="form-group">
        <label>Email Adress</label>
        <input type="text" className="form-control" onChange={(e) => setEmail(e.target.value)} />
        {errors.length > 0 &&
          <div className="my-0  ">
            {errors.filter(err => err.field === 'email').map(err => (
              <p className="alert alert-danger" key={err.message}>
                {err.message}
              </p>
            ))}
          </div>
        }
      </div>
      <div className="form-group">
        <label>Password</label>
        <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} />
        {errors.length > 0 &&
          <div className="my-0  ">
            {errors.filter(err => err.field === 'password').map(err => (
              <p className="alert alert-danger" key={err.message}>
                {err.message}
              </p>
            ))}
          </div>
        }
      </div>
      <button onClick={onSubmit} className="btn btn-primary">Sign Up </button>
    </form >
  )
}


export default Signup
