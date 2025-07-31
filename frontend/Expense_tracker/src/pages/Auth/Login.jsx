import React from 'react';
import AuthLayout from '../../components/layouts/AuthLayout';
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from '../../utils/helper';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please ente a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setError("");

    //Login API call
  }

  
  const navigate = useNavigate()
  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className='text-xl font-semibold text-black'>Welcome Back!</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>
          Please enter your credentials to access your accunt.
        </p>

        <form onSubmit={handleLogin}>
          <Input 
            value={email}
            onChange={({target}) => setEmail(target.value)}
            label="Email address"
            placeholder='john@example.com'
            type='text'
          />
          <Input 
            value={password}
            onChange={({target}) => setPassword(target.value)}
            label="Password"
            placeholder='********'
            type='password'
          />

          {error && <p className='text-red-500 text-xs mt-2'>{error}</p>}

          <button type='submit' className='btn-primary'>
            LOGIN
          </button>

          <p className='text-[15px] text-slate-800 mt-3'>
            Don't have an account? {" "}
            <Link className='font-medium text-primary underline' to="/signup">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  )
}

export default Login
