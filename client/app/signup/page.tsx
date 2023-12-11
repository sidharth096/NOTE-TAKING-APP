// pages/signup.js
"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link'
import { useRouter } from 'next/navigation';

const Signup = () => {
    const router = useRouter()
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')
    const [errorName, setErrorname] = useState('')

    const isValidEmail = (email: string) => {
        const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
        return emailRegex.test(email)
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        console.log('Form submitted with:', { name, email, password });


        //validation

        if (!name) {
            setErrorname("name")
            setError("Name is required")
            return
        }
        if (!isValidEmail(email)) {
            setErrorname("email")
            setError("Email is invalid")
            return
        }
        if (!password) {
            setErrorname("password")
            setError("Password is required")
            return
        }
        if (password.length < 6) {
            setErrorname("password")
            setError('Password must have 6 letters')
            return
        }
        else {
            setErrorname('')
            setError("")

          
            //api
            try {
                const response = await axios.post('http://localhost:3000/users/register', { name, email, password })
                console.log('succus',response.data);
                if(response.data.error){
                    setErrorname("server")
                    setError(response.data.error)

                  }
                  else{
                    
                    router.push('/login')
                  }

            } catch (error) {
                console.error('Error:', error);
            }
        }
    };




    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-md p-6 bg-white rounded-md shadow-md bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-300">
                <div className='flex justify-center'>
                    <h1 className='font-bold text-2xl'>Sign up</h1>
                </div>
                <div className='flex justify-center'><p className='text-red-600'>{errorName=== 'server'&& error}</p></div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className="mt-3 block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name:</label>
                        <input
                            className="w-full p-2 border rounded-md focus:outline-none focus:border-black"
                            id="name"
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <p className='text-red-600'>{errorName == 'name' && error}</p>

                        <label className="mt-3 block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email:</label>
                        <input
                            className="w-full p-2 border rounded-md focus:outline-none focus:border-black"
                            id="email"
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}

                        />
                        <p className='text-red-600'>{errorName == 'email' && error}</p>

                        <label className=" mt-3 block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password:</label>
                        <input
                            className="w-full p-2 border rounded-md focus:outline-none focus:border-black"
                            id="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <p className='text-red-600'>{errorName == 'password' && error}</p>
                    </div>

                    <Link href="/login"><p className='text-center mt-3 cursor-pointer text-blue-700 '>Alredy have an account</p></Link>

                    <div className='flex justify-center'>
                        <button className="mt-4 bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
