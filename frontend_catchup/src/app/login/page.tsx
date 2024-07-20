"use client";
import React, { useState } from 'react';

interface LoginProps {}

const LoginPage: React.FC<LoginProps> = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle form submission logic (replace with your authentication method)

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg px-8 pb-8 pt-12 sm:w-1/2 md:w-1/3 lg:w-1/4">
        <h1 className="text-2xl font-semibold text-center mb-4">Login</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-sm font-medium">Email address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block mb-2 text-sm font-medium">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700"
            >
              Login
            </button>
            <a href="#" className="text-sm text-gray-600 hover:underline">
              Forgot password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
