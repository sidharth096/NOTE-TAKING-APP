"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface User {
  name: string;
  email: string;
  _id: string;
}
interface Note{
    map: any;
    title:string;
    description:string;
    colour:string;
}

const Note = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('red'); 
  const [error, setError] = useState('');
  const [errorName, setErrorname] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [userNotes,setUsernotes] = useState<Note|null>(null)

  useEffect( ()=> {
    
    const getData = async()=>{
        const userJson = localStorage.getItem('user');
        if (userJson) {
          const user = JSON.parse(userJson);
          setUser(user);
          try {
            const response = await axios.get(`http://localhost:3000/notes/noteById/${user._id}`);
            console.log(response.data);
            setUsernotes(response.data)
            console.log("11",userNotes);
            
            
          } catch (error) {
            
          }
        } else {
          router.push('/');
        }
    }
    getData();
   
  }, [userNotes]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log('Note added:', { title, description, color });

    const userId = user?._id;

    // Validation
    if (!title) {
      setErrorname('title');
      setError('Title is required');
      return;
    }
    if (!description) {
      setErrorname('content');
      setError('Content is required');
      return;
    }

    // API call
    try {
      const response = await axios.post('http://localhost:3000/notes/createnote', {
        title,
        description,
        userId,
        colour:color,
      });
      console.log('success', response.data);
      if (response.data.error) {
        setErrorname('server');
        setError(response.data.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }

    // Clear form
    setTitle('');
    setDescription('');
    setError('');
    setErrorname('');
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-200">
      <div className="pr-5 flex justify-end p-2">
        {user && (
          <>
            <h3 className="text-black text-end p-2 pr-5 font-semibold text-xl">{user.name}</h3>
            <button className="bg-black text-yellow-400 rounded-md px-2" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
      <div className="flex items-center justify-center">
        <div className="max-w-md p-6 rounded-md shadow-lg bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-300">
          <h1 className="text-3xl font-bold mb-4 text-center">Add a New Note</h1>
          <form onSubmit={handleSubmit}>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
              Title:
            </label>
            <input
              className="w-full p-2 border rounded-md focus:outline-none focus:border-black"
              id="title"
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <p className="text-red-600">{errorName == 'title' && error}</p>

            <label className="block text-gray-700 text-sm font-bold mb-2 mt-3" htmlFor="content">
              Content:
            </label>
            <textarea
              className="w-full p-2 border rounded-md focus:outline-none focus:border-black"
              id="content"
              placeholder="Enter content"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <p className="text-red-600">{errorName == 'content' && error}</p>

            <label className="block text-gray-700 text-sm font-bold mb-2 mt-2" htmlFor="color">
              Color:
            </label>
            <select
              id="color"
              className="w-full p-2 border rounded-md focus:outline-none focus:border-black "
              value={color}
              onChange={(e) => setColor(e.target.value)}
            >
              <option value="red">Red</option>
              <option value="green">Green</option>
              <option value="pink">pink</option>
              <option value="blue">Blue</option>
              <option value="orange">orange</option>
              <option value="violet">violet</option>
             
            </select>

            <div className="flex justify-center mt-4">
              <button
                className="bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Add Note
              </button>
            </div>
          </form>
        </div>
      </div>
     
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-16 text-center px-6  pb-20 ">
  {userNotes &&
    userNotes.map((note: any) => (
      <div key={note._id}   className={`w-full h-full p-2 bg-${note.colour}-500 rounded-md  h-48`}  >
        <p className="text-black font-bold text-2xl mt-2">{note.title}</p>
        <div className=''>
         <p className="text-black mt-6 font-semibold">{note.description}</p>
        </div>
        
      </div>
    ))}
</div>
    </div>
  );
};

export default Note;
