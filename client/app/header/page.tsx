"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';

const Header = () => {

    const router = useRouter()
    const [user,setUser]=useState("")

    useEffect(()=>{
      const userJson = localStorage.getItem('user')
      if(userJson){
        const user = JSON.parse(userJson)
        setUser(user.name)
      }

      
    },[user])

    const handleLogout = ()=>{
         localStorage.clear()
         setUser('')
         router.push("/")
    }  

  return (
    <div className='bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-300  h-16'>
    <div className='pr-5 flex justify-end p-2'>
      {user && (
        <>
          <h3 className='text-black text-end p-2 pr-5 font-semibold text-xl'>{user}</h3>
          <button className='bg-black text-yellow-400 rounded-md px-2' onClick={handleLogout}>
            Logout
          </button>
        </>
      )}
    </div>
  </div>
  
  )
}

export default Header
