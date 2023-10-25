'use client';
import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import Head from 'next/head';
import Calendar from 'react-calendar';



export default function Home() {

  const [date, setDate] = useState(new Date());
  const [token, setToken] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    console.log('Stored token: ', storedToken);
    setToken(storedToken);
  }, []);

  if (!token) {
    console.error('Token not available.');
    return;
  }

  const decodedToken = jwt_decode(token);
  const username = decodedToken.username;
  
  console.log("username: ", username);

  return (
    <div className="h-screen">
      <Head>
        <title>Productivity App</title>
      </Head>
      <main className="flex flex-col justify-center items-center">
        <h1 className='text-white mb-5'>Welcome {username} </h1>
        <h2 className='text-white'>Today's date is: {date.toLocaleDateString()}</h2>
        <Calendar className='text-white bg-blue-500 p-10 rounded-lg shadow-white shadow-sm'
          onChange={setDate}
          locale='en-US'
          value={date}
        />
      </main>
    </div>
  );
};