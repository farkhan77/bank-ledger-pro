import React from 'react'
import './Login.scss'
import { useState } from 'react'
import newRequest from '../../utils/newRequest';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await newRequest.post("/auth/login", {
        username,
        password,
      })
      console.log(res.data);
      localStorage.setItem('currentUser', JSON.stringify(res.data));
      navigate('/list');
    } catch (error) {
      setError(error.response.data);
      console.log(error.response.data);
    }
  }

  return (
    <div className='login'>
      <form onSubmit={handleSubmit}>
        <h1>Sign in</h1>
        <label htmlFor="">Username</label>
        <input name='username' type="text" placeholder='your username' onChange={e=>setUsername(e.target.value)} />

        <label htmlFor="">Password</label>
        <input name='password' type="password" onChange={e=>setPassword(e.target.value)} />
        <button type='submit'>Login</button>
        { error && error }
      </form>
    </div>
  )
}

export default Login