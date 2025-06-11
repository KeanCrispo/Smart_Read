import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/dashboards/StudentDashboard';
import AdminDashboard from './pages/dashboards/AdminDashboard.tsx';
import GuardianDashboard from './pages/dashboards/GuardianDashboard';
import LessonView from './pages/lessons/LessonView';
import LessonsList from './pages/lessons/LessonsList';
import LessonEdit from './pages/lessons/LessonEdit';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/auth/ProtectedRoute';
import PhotoWordVowelSelect from './pages/lessons/PhotoWordVowelSelect';
import PhotoWordVowelLesson from './pages/lessons/PhotoWordVowelLesson';
import PhotoWordVowelQuiz from './pages/lessons/PhotoWordVowelQuiz';
import StudentLogin from './pages/lessons/StudentLogin';
import StudentRegister from './pages/lessons/StudentRegister';
import ForgotPassword from './pages/ForgotPassword';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="/student-login" element={<StudentLogin />} />
            <Route path="/student-register" element={<StudentRegister />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Vowel Lesson Routes - Place these here! */}
            <Route path="lessons/vowel" element={<PhotoWordVowelSelect />} />
            <Route path="lessons/vowel/:vowel" element={<PhotoWordVowelLesson />} />
            <Route path="lessons/vowel/:vowel/quiz" element={<PhotoWordVowelQuiz />} />

            {/* Student Routes */}
            <Route 
              path="student/*" 
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <Routes>
                    <Route index element={<StudentDashboard />} />
                    <Route path="lessons" element={<LessonsList userRole="student" />} />
                    <Route path="lessons/:lessonId" element={<LessonView />} />
                  </Routes>
                </ProtectedRoute>
              } 
            />
            
            {/* Admin Routes */}
            <Route 
              path="admin/*" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <Routes>
                    <Route index element={<AdminDashboard />} />
                    <Route path="lessons" element={<LessonsList userRole="admin" />} />
                    <Route path="lessons/create" element={<LessonEdit mode="create" />} />
                    <Route path="lessons/:lessonId" element={<LessonView />} />
                    <Route path="lessons/:lessonId/edit" element={<LessonEdit mode="edit" />} />
                  </Routes>
                </ProtectedRoute>
              } 
            />
            
            {/* Guardian Routes */}
            <Route 
              path="guardian/*" 
              element={
                <ProtectedRoute allowedRoles={['guardian']}>
                  <Routes>
                    <Route index element={<GuardianDashboard />} />
                    <Route path="progress" element={<LessonsList userRole="guardian" />} />
                  </Routes>
                </ProtectedRoute>
              } 
            />
            
            {/* Fallback route */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
