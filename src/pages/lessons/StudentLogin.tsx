// filepath: c:\Users\keanc\Desktop\SmartRead-main\src\pages\StudentLogin.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser, UserRole } from '../../contexts/UserContext';
import { supabase } from '../../supabase';

const StudentLogin = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Query Supabase for a student with the entered name (case-insensitive)
    const { data, error: fetchError } = await supabase
      .from('students')
      .select('*')
      .ilike('name', name.trim());

    if (fetchError) {
      setError('Database error');
    } else if (data && data.length > 0) {
      const student = data[0];
      login({
        id: student.id,
        username: student.name,
        email: '', // or student.email if you add it to your table
        role: 'student' as UserRole,
      });
      navigate('/student');
    } else {
      setError('Student not found');
    }

    setIsLoading(false);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-green-600 p-6 text-white">
          <h1 className="text-2xl font-bold text-center">Student Login</h1>
          <p className="text-center text-green-100 mt-2">Enter your name to login</p>
        </div>
        <div className="p-6">
          {error && (
            <div className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
              {error}
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
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <p className="text-center mt-4">
            Not registered?{' '}
            <a href="/student-register" className="text-green-600 hover:underline">
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;