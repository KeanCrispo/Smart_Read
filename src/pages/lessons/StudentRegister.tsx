import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabase';

const StudentRegister = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    // Check if student already exists
    const { data: existing, error: checkError } = await supabase
      .from('students')
      .select('*')
      .ilike('name', name.trim());

    if (checkError) {
      setError('Database error');
    } else if (existing && existing.length > 0) {
      setError('Student already exists');
    } else {
      // Insert new student
      const { error: insertError } = await supabase
        .from('students')
        .insert([{ name: name.trim() }]);
      if (insertError) {
        setError('Registration failed');
      } else {
        setSuccess('Registration successful! You can now log in.');
        setTimeout(() => navigate('/student-login'), 1500);
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-green-600 p-6 text-white">
          <h1 className="text-2xl font-bold text-center">Student Register</h1>
          <p className="text-center text-green-100 mt-2">Enter your name to register</p>
        </div>
        <div className="p-6">
          {error && (
            <div className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-100 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">
              {success}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                Student Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2 px-4 rounded-lg bg-green-600 text-white font-bold hover:bg-green-700 transition-colors ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Registering...' : 'Register'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentRegister;