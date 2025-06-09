import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, BookOpen, Edit } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';
import { supabase } from '../../supabase';

const LessonView = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const { user } = useUser();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    async function fetchLesson() {
      const { data, error: fetchError } = await supabase
        .from('lessons')
        .select('*')
        .eq('id', lessonId)
        .single();
      if (fetchError) setError(fetchError.message);
      setLesson(data || null);
      setLoading(false);
    }
    fetchLesson();
  }, [lessonId]);

  const getDashboardPath = () => {
    if (!user) return '/';
    switch (user.role) {
      case 'student': return '/student/lessons';
      case 'admin': return '/admin/lessons';
      case 'guardian': return '/guardian';
      default: return '/';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getFileUrl = (filePath: string) => {
    if (!filePath) return '';
    if (filePath.startsWith('http')) return filePath;
    return `http://localhost:5000/${filePath}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Lesson Not Found</h2>
        <p className="text-gray-600 mb-4">The lesson you're looking for doesn't exist or has been removed.</p>
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center mx-auto space-x-1 bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          <ArrowLeft size={16} />
          <span>Go Back</span>
        </button>
      </div>
    );
  }

  // Add this inside your component, before the return
  console.log('lesson.file_path:', lesson.file_path);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back and Lesson Header */}
      <div className="mb-6">
        <Link 
          to={getDashboardPath()} 
          className="inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft size={16} className="mr-1" />
          <span>Back to lessons</span>
        </Link>
      </div>

      {/* Lesson Card */}
      <motion.div 
        className="bg-white rounded-xl shadow-md overflow-hidden mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4 text-white">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">{lesson.title}</h1>
            {user?.role === 'admin' && (
              <Link 
                to={`/admin/lessons/${lesson.id}/edit`}
                className="inline-flex items-center bg-white bg-opacity-20 text-white px-3 py-1 rounded-lg hover:bg-opacity-30"
              >
                <Edit size={16} className="mr-1" />
                <span>Edit</span>
              </Link>
            )}
          </div>
        </div>

        <div className="p-6">
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="bg-gray-100 px-4 py-2 rounded-lg">
              <p className="text-sm text-gray-500">Difficulty</p>
              <p className="font-medium text-gray-800">{lesson.difficulty}</p>
            </div>
            <div className="bg-gray-100 px-4 py-2 rounded-lg">
              <p className="text-sm text-gray-500">Created By</p>
              <p className="font-medium text-gray-800">{lesson.uploaded_by}</p>
            </div>
            <div className="bg-gray-100 px-4 py-2 rounded-lg">
              <p className="text-sm text-gray-500">Date</p>
              <p className="font-medium text-gray-800">{formatDate(lesson.created_at)}</p>
            </div>
          </div>
          <p className="text-gray-700 mb-4">{lesson.description}</p>
          {lesson.file_path && (
            <div className="flex items-center space-x-2 text-blue-600 mb-4">
              <Download size={16} />
              <a href={getFileUrl(lesson.file_path)} className="hover:underline" target="_blank" rel="noopener noreferrer">
                View Attached File
              </a>
            </div>
          )}
        </div>
      </motion.div>

      {/* Lesson Content */}
      <motion.div 
        className="bg-white rounded-xl shadow-md p-6 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <BookOpen size={20} className="mr-2 text-blue-600" />
          Lesson Content
        </h2>

        {/* Show lesson content text */}
        {lesson.content && (
          <div className="prose max-w-none mb-4">
            {lesson.content.split('\n').map((line: string, idx: number) => (
              <p key={idx}>{line}</p>
            ))}
          </div>
        )}

        {/* Show uploaded image if available */}
        {lesson.file_path && lesson.file_path.match(/\.(jpeg|jpg|gif|png|webp)$/i) && (
          <div className="flex flex-col items-center mb-4">
            <img
              src={getFileUrl(lesson.file_path)}
              alt="Lesson"
              className="max-w-[60%] max-h-[500px] rounded shadow mb-4"
              style={{ display: 'block', margin: '0 auto' }}
            />
            <div className="flex gap-2">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded"
                disabled
              >
                View Only
              </button>
              <a
                href={getFileUrl(lesson.file_path)}
                download
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Download
              </a>
            </div>
          </div>
        )}

        {/* Show PDF if uploaded */}
        {lesson.file_path && lesson.file_path.match(/\.pdf$/i) && (
          <div className="flex justify-center">
            <iframe
              src={lesson.file_path}
              title="Lesson PDF"
              width="100%"
              height="500px"
              className="rounded shadow"
            />
          </div>
        )}
      </motion.div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
    </div>
  );
};

export default LessonView;
