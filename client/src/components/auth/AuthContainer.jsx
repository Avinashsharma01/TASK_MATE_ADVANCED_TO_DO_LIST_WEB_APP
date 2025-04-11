import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthContainer = ({ onAuthSuccess }) => {
  const [activeForm, setActiveForm] = useState('login');
  
  const switchToRegister = () => setActiveForm('register');
  const switchToLogin = () => setActiveForm('login');
  
  return (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg border border-gray-100">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-primary">Task Mate</h1>
        <p className="text-gray-600 mt-1">Your personal task manager</p>
      </div>
      
      {activeForm === 'login' ? (
        <LoginForm 
          onSuccess={onAuthSuccess} 
          switchToRegister={switchToRegister} 
        />
      ) : (
        <RegisterForm 
          onSuccess={onAuthSuccess} 
          switchToLogin={switchToLogin} 
        />
      )}
    </div>
  );
};

export default AuthContainer; 