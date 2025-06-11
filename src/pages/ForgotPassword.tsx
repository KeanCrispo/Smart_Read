import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [foundPassword, setFoundPassword] = useState<string | null>(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setFoundPassword(null);

    const savedUsers = JSON.parse(localStorage.getItem('smartreadUsers') || '[]');
    const user = savedUsers.find((u: any) => u.email === email);

    if (user) {
      setFoundPassword(user.password);
    } else {
      setError('No account found with that email.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-blue-600 p-6 text-white">
          <h1 className="text-2xl font-bold text-center">Forgot Password</h1>
        </div>
        <div className="p-6">
          {foundPassword ? (
            <div className="text-center">
              <p className="mb-4 text-green-700 font-semibold">
                Your password is:
              </p>
              <div className="text-2xl font-bold mb-6">{foundPassword}</div>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={() => navigate('/login')}
              >
                Back to Login
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Enter your email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                required
              />
              {error && (
                <div className="text-red-600 mb-2">{error}</div>
              )}
              <button
                type="submit"
                className="w-full py-2 px-4 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors"
              >
                Show Password
              </button>
              <button
                type="button"
                className="w-full mt-2 py-2 px-4 rounded-lg bg-gray-300 text-gray-800 font-bold hover:bg-gray-400 transition-colors"
                onClick={() => navigate('/login')}
              >
                Cancel
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;