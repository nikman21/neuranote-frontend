// Topbar.js
'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import jwt_decode from 'jwt-decode';
import Avatar from '@mui/material/Avatar';
import { useUserAvatar } from '../../helpers/avatarHelper';

const Topbar = () => {

  const [firstLetter, setFirstLetter] = useState('');
  const initialToken = typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null;
  const { token, username } = useUserAvatar(initialToken);

  useEffect(() => {
    if (username) {
      setFirstLetter(username.charAt(0).toUpperCase());
    }
  }, [username]);


  return (
    <nav className="topbar bg-secondary-blue">
      <Link href="/dashboard" className="flex items-center gap-4">
        <p className='text-3xl text-white font-bold max-xs:hidden'>NeuroNote</p>
      </Link>

      <div className="flex items-center gap-1">
        {token && username && <Avatar>{firstLetter}</Avatar>}
      </div>
    </nav>
  );
};

export default Topbar;