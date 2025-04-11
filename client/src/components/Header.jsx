import React from 'react';
import { useAuthContext } from '../context/AuthContext';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuthContext();
  
  return (
    <header className="bg-primary text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Task Mate</h1>
            <p className="text-primary-light">Manage your tasks with ease</p>
          </div>
          
          <div>
            {isAuthenticated && (
              <div className="flex items-center space-x-4">
                <div className="hidden md:block bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm">
                  <span className="text-sm">Welcome, {user.username}</span>
                </div>
                <button
                  onClick={logout}
                  className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-md text-sm transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 