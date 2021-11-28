import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react'
import { useState } from 'react'
import useRequest from '../../hooks/use-request'


const Signup: NextPage = () => {
  const router = useRouter()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { request, errors } = useRequest({
    url: '/api/users/signin',
    method: 'post',
    body: {
      email, password
    },
    onSucces: () => router.push('/')
  })

  console.log(request)
  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    request()

  }


  return (
    <form>
      <h1>Signin</h1>
      <div className="form-group">
        <label>Email Adress</label>
        <input type="text" className="form-control" onChange={(e) => setEmail(e.target.value)} />
        {errors &&
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
        {errors &&
          <div className="my-0  ">
            {errors.filter(err => err.field === 'password').map(err => (
              <p className="alert alert-danger" key={err.message}>
                {err.message}
              </p>
            ))}
          </div>
        }
      </div>
      <button onClick={onSubmit} className="btn btn-primary">Sign In </button>
    </form >
  )
}


export default Signup
