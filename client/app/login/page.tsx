"use client"
import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [errorName, setErrorName] = useState('');

  const isValidEmail = (email:string) => {
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    // Validation
    if (!isValidEmail(email)) {
      setErrorName('email');
      setError('Email is invalid');
      return;
    }
    if (!password) {
      setErrorName('password');
      setError('Password is required');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/users/login', {
        email,
        password,
      });
      console.log('Success', response.data);
      if(response.data.error){
        setErrorName("server")
        setError(response.data.error)
      }
      localStorage.setItem('user', JSON.stringify(response.data));
      router.push("/note")
      
    } catch (error) {
      console.error('Error:', error);


    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md p-6 bg-white rounded-md shadow-md bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-300">
        <div className="flex  justify-center">
          <h1 className="font-bold text-2xl">Login</h1>     
        </div>
        <div className='flex justify-center'><p className='text-red-600'>{errorName=== 'server'&& error}</p></div>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="mt-3 block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email:
            </label>
            <input
              className="w-full p-2 border rounded-md focus:outline-none focus:border-black"
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className="text-red-600">{errorName === 'email' && error}</p>

            <label className="mt-3 block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password:
            </label>
            <input
              className="w-full p-2 border rounded-md focus:outline-none focus:border-black"
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}

            />
            <p className="text-red-600">{errorName === 'password' && error}</p>
          </div>

          <Link href="/signup"><p className='text-center mt-3 cursor-pointer text-blue-700 '>Register as a new user</p></Link>

          <div className="flex justify-center">
            <button
              className="mt-4 bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
