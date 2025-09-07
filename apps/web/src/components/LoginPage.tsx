import React, { useState } from 'react';

interface LoginPageProps {
  onLoginSuccess: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [inputCode, setInputCode] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    // Access the ALLOW_CODE from environment variables
    // In a Vite project, environment variables are exposed via import.meta.env
    // We'll assume the environment variable is named VITE_ALLOW_CODE
    const correctCode = import.meta.env.VITE_ALLOW_CODE;

    if (inputCode === correctCode) {
      localStorage.setItem('loggedIn', 'true');
      onLoginSuccess();
    } else {
      setError('Incorrect code. Please try again.');
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#f0f2f5',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        backgroundColor: '#fff',
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        textAlign: 'center'
      }}>
        <h1 style={{ marginBottom: '30px', color: '#333', fontSize: '2em' }}>开源免费的白板思维服务</h1>
        <h2 style={{ marginBottom: '20px', color: '#333' }}>Enter Access Code</h2>
        <input
          type="password"
          value={inputCode}
          onChange={(e) => setInputCode(e.target.value)}
          placeholder="Enter code"
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '15px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            boxSizing: 'border-box'
          }}
        />
        <button
          onClick={handleLogin}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Login
        </button>
        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
