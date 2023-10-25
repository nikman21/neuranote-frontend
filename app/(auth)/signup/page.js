'use client';

import { useState } from 'react';
import { signUp } from '../../utils/auth/api';
import { useRouter } from 'next/navigation';

export default function Signup() {

  const router = useRouter();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make the signup API call
      const response = await signUp(formData);

      // Handle the response here (e.g., show a success message, redirect to login page)
      console.log('Signup response:', response);

      router.push('/');
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block mb-2 font-bold text-gray-700">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 font-bold text-gray-700">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 font-bold text-gray-700">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block mb-2 font-bold text-gray-700">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
