import { useState } from 'react';
import axios from 'axios';
import useRequest from '../../hooks/use-request';
import Router from 'next/router';

export default () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { doRequest, errors } = useRequest({
    url: '/api/users/signup',
    method: 'post',
    body: {
      email,
      password
    },
    onSuccess: () => Router.push('/')    // only when successfully signed up, route to rooot
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    await doRequest();
    // try {                                                                    // put into use-request hook helper function
    //   const response = await axios.post('/api/users/signup', {
    //     email, password
    //   });
    //   console.log(response.data);
    // } catch (error) {
    //   console.log(error.response.data);
    // }
  }
  return (
    <form onSubmit={onSubmit}>
      <h1>Sign Up</h1>
      <div className="form-group">
        <label>Email Address</label>
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
          className="form-control"
        />
      </div>
      {errors}
      <button className="btn btn-primary">Sign Up</button>
    </form>
  )
}