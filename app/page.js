'use client';

import Head from 'next/head';
import Link from 'next/link';



export default function Home() {


  return (
    <div className="h-screen">
      <Head>
        <title>Productivity App</title>
      </Head>
      <main className="flex flex-col justify-center items-center">
        <h1 className='text-white mb-5'>Welcome </h1>

        <div className="flex flex-row justify-center items-center">
          <button className="bg-white text-black rounded-md p-2 m-2"><Link href='/login'>Login</Link></button>
          <button className="bg-white text-black rounded-md p-2 m-2"><Link href='/signup'>Sign Up</Link></button>
        </div>
        
        
      </main>
    </div>
  );
}