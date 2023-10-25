'use client';

import { useState} from 'react';
import { loginUser } from '../../utils/auth/api';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const router = useRouter();
  
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
          const response = await loginUser({ email, password });
          console.log(response);
          if (response) {
            console.log('Received JWT token: ', response.token);
            localStorage.setItem('token', response.token);
            // Redirect the user to the homepage
            router.push('/dashboard');
          } else {
            console.log('Login failed.');
          }
        } catch (error) {
          console.error(error);
        }
      };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen ">
            <div className="bg-white p-8 rounded shadow-md">
                <form onSubmit={handleLogin} className="w-full max-w-sm">
                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-2 font-bold text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block mb-2 font-bold text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                        >
                            Sign In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;