import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Award, BookCheck, BookText } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';
import { supabase } from '../../supabase';
import aiIcon from '../../../AI_ICON.png'; // Adjust path if needed
import textBubble from '../../../TEXT_BUBLE.png'; // <-- Add this import

type Lesson = {
  id: string;
  title: string;
  description: string;
  content: string;
  file_path: string;
  difficulty: string;
  uploaded_by: string;
  created_at: string;
};

const StudentDashboard = () => {
  const { user } = useUser();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [recentLessons, setRecentLessons] = useState<Lesson[]>([]);
  const [inProgressLessons, setInProgressLessons] = useState<Lesson[]>([]);
  const [completedLessons, setCompletedLessons] = useState<Lesson[]>([]);

  // --- Chat box state and logic (offline only) ---
  const [messages, setMessages] = useState<string[]>(() => {
    const saved = localStorage.getItem('offlineChat');
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [chatOpen, setChatOpen] = useState(false); // <-- Add this line

  useEffect(() => {
    localStorage.setItem('offlineChat', JSON.stringify(messages));
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Simple offline bot reply
  const getBotReply = (userMessage: string) => {
    const msg = userMessage.toLowerCase();

    // Greetings & Small Talk
    if (msg.includes("hello") || msg.includes("hi")) return "Hello! How can I help you today?";
    if (msg.includes("good morning")) return "Good morning! Ready to learn something new?";
    if (msg.includes("good afternoon")) return "Good afternoon! How can I assist you?";
    if (msg.includes("good evening")) return "Good evening! Need help with your lessons?";
    if (msg.includes("bye")) return "Goodbye! Have a great day!";
    if (msg.includes("how are you")) return "I'm here to help you learn!";

    // Help & About
    if (msg.includes("help")) return "You can ask me about lessons, achievements, dashboard features, or how to use SmartRead!";
    if (msg.includes("what can you do")) return "I can answer questions about your lessons, achievements, and how to use this dashboard.";
    if (msg.includes("who are you")) return "I'm your SmartRead assistant, here to help you learn!";
    if (msg.includes("what is smartread")) return "SmartRead is an interactive platform to help you improve your reading skills.";

    // Lessons
    if (msg.includes("how do i start a lesson")) return "Click on any lesson card in the dashboard to start.";
    if (msg.includes("how do i continue a lesson")) return "Go to the 'Continue Learning' section and click your lesson.";
    if (msg.includes("how do i complete a lesson")) return "Finish all activities in a lesson to complete it.";
    if (msg.includes("how many lessons")) return `There are currently ${lessons.length} lessons available.`;
    if (msg.includes("what are new lessons")) return "New lessons are shown in the 'New Lessons' section.";
    if (msg.includes("what are recent lessons")) return "Recent lessons are displayed in the 'New Lessons' section.";
    if (msg.includes("what is a lesson")) return "A lesson is a set of reading activities to help you learn.";
    if (msg.includes("lesson") && msg.includes("progress")) return "Lessons in progress are shown in the 'Continue Learning' section.";
    if (msg.includes("lesson") && msg.includes("complete")) return "Completed lessons appear in your Achievements section.";
    if (msg.includes("lesson") && msg.includes("start")) return "To start a lesson, click on any lesson card in the dashboard.";
    if (msg.includes("lesson") && msg.includes("difficulty")) return "Each lesson has a difficulty: easy, medium, or hard.";
    if (msg.includes("lesson") && msg.includes("description")) return "Each lesson card shows a short description of the lesson.";
    if (msg.includes("lesson") && msg.includes("author")) return "The lesson card shows who uploaded the lesson.";
    if (msg.includes("lesson") && msg.includes("vowel")) return "You can practice vowels by clicking the 'Vowel Lessons' card in the New Lessons section.";
    if (msg.includes("vowel")) return "Vowel Lessons help you practice A, E, I, O, U with words and pictures.";
    if (msg.includes("can i repeat a lesson")) return "Yes, you can repeat any lesson as many times as you like.";
    if (msg.includes("can i skip a lesson")) return "You can choose which lessons to start or skip.";
    if (msg.includes("lesson") && msg.includes("available")) return `There are ${lessons.length} available lessons.`;
    if (msg.includes("lesson") && msg.includes("in progress")) return `You have ${inProgressLessons.length} lessons in progress.`;
    if (msg.includes("lesson") && msg.includes("completed")) return `You have completed ${completedLessons.length} lessons.`;
    if (msg.includes("lesson") && msg.includes("how long")) return "Lesson length varies, but most take about 10-20 minutes.";
    if (msg.includes("lesson") && msg.includes("photo")) return "Some lessons include photos to help you learn.";
    if (msg.includes("lesson") && msg.includes("word")) return "Lessons help you learn new words and their meanings.";
    if (msg.includes("lesson") && msg.includes("content")) return "Lesson content includes reading passages, questions, and activities.";
    if (msg.includes("lesson") && msg.includes("file")) return "Some lessons may have downloadable files.";
    if (msg.includes("lesson") && msg.includes("created")) return "Each lesson shows when it was created.";
    if (msg.includes("lesson") && msg.includes("uploaded")) return "Each lesson shows who uploaded it.";
    if (msg.includes("lesson") && msg.includes("title")) return "The lesson title is shown at the top of each lesson card.";
    if (msg.includes("lesson") && msg.includes("card")) return "Lesson cards show the title, description, difficulty, and author.";
    if (msg.includes("lesson") && msg.includes("section")) return "Lessons are organized in sections on your dashboard.";
    if (msg.includes("lesson") && msg.includes("view all")) return "Click 'View All' to see all available lessons.";
    if (msg.includes("lesson") && msg.includes("grid")) return "Lessons are displayed in a grid for easy browsing.";
    if (msg.includes("lesson") && msg.includes("shadow")) return "Lesson cards have a shadow effect when you hover over them.";
    if (msg.includes("lesson") && msg.includes("hover")) return "Hover over a lesson card to see a visual effect.";
    if (msg.includes("lesson") && msg.includes("transition")) return "Lesson cards have a smooth transition effect on hover.";
    if (msg.includes("lesson") && msg.includes("color")) return "Lesson cards use different colors for difficulty levels.";
    if (msg.includes("lesson") && msg.includes("easy")) return "Easy lessons are marked with a green label.";
    if (msg.includes("lesson") && msg.includes("medium")) return "Medium lessons are marked with a yellow label.";
    if (msg.includes("lesson") && msg.includes("hard")) return "Hard lessons are marked with a red label.";
    if (msg.includes("lesson") && msg.includes("practice")) return "You can practice lessons as many times as you want.";
    if (msg.includes("lesson") && msg.includes("activity")) return "Lessons may include reading, writing, or quiz activities.";
    if (msg.includes("lesson") && msg.includes("quiz")) return "Some lessons include quizzes to test your understanding.";
    if (msg.includes("lesson") && msg.includes("score")) return "You may receive a score after completing a quiz.";
    if (msg.includes("lesson") && msg.includes("feedback")) return "Some lessons provide feedback after completion.";
    if (msg.includes("lesson") && msg.includes("review")) return "You can review completed lessons anytime.";
    if (msg.includes("lesson") && msg.includes("summary")) return "Lesson summaries are shown at the end of each lesson.";
    if (msg.includes("lesson") && msg.includes("restart")) return "You can restart any lesson from the beginning.";
    if (msg.includes("lesson") && msg.includes("progress bar")) return "The progress bar shows how much of the lesson you've completed.";
    if (msg.includes("lesson") && msg.includes("percentage")) return "The percentage shows your completion progress for each lesson.";
    if (msg.includes("lesson") && msg.includes("continue")) return "Continue your lessons from the 'Continue Learning' section.";
    if (msg.includes("lesson") && msg.includes("stop")) return "You can stop a lesson anytime and continue later.";
    if (msg.includes("lesson") && msg.includes("resume")) return "Resume lessons from where you left off in 'Continue Learning'.";
    if (msg.includes("lesson") && msg.includes("history")) return "Your lesson history is shown in the dashboard sections.";
    if (msg.includes("lesson") && msg.includes("list")) return "Lessons are listed in the dashboard for easy access.";
    if (msg.includes("lesson") && msg.includes("filter")) return "Currently, lessons are organized by recency and progress.";
    if (msg.includes("lesson") && msg.includes("sort")) return "Lessons are sorted by newest first in the 'New Lessons' section.";
    if (msg.includes("lesson") && msg.includes("search")) return "Use the dashboard to browse lessons. Search may be added soon.";
    if (msg.includes("lesson") && msg.includes("recommend")) return "Try the 'Vowel Lessons' or the newest lessons to get started.";
    if (msg.includes("lesson") && msg.includes("favorite")) return "You can revisit any lesson you like as often as you want.";
    if (msg.includes("lesson") && msg.includes("bookmark")) return "Bookmarking lessons is not available yet.";
    if (msg.includes("lesson") && msg.includes("share")) return "Sharing lessons is not available yet.";
    if (msg.includes("lesson") && msg.includes("download")) return "Some lessons may have files you can download.";
    if (msg.includes("lesson") && msg.includes("upload")) return "Only teachers can upload new lessons.";
    if (msg.includes("lesson") && msg.includes("teacher")) return "Lessons are created and uploaded by teachers.";
    if (msg.includes("lesson") && msg.includes("student")) return "Students can view, start, and complete lessons.";
    if (msg.includes("lesson") && msg.includes("dashboard")) return "Your dashboard shows all your lesson activity.";
    if (msg.includes("lesson") && msg.includes("achievement")) return "Complete lessons to earn achievements!";
    if (msg.includes("lesson") && msg.includes("award")) return "Awards are given for completing lessons.";
    if (msg.includes("lesson") && msg.includes("badge")) return "Badges are earned by completing lessons and achievements.";

    // Achievements
    if (msg.includes("achievement") && msg.includes("how")) return "Earn achievements by completing lessons.";
    if (msg.includes("achievement") && msg.includes("what")) return "Achievements are rewards for completing lessons.";
    if (msg.includes("achievement") && msg.includes("see")) return "View your achievements in the Achievements section.";
    if (msg.includes("achievement") && msg.includes("list")) return "Achievements are listed in the Achievements section.";
    if (msg.includes("achievement") && msg.includes("count")) return `You have earned ${completedLessons.length} achievements.`;
    if (msg.includes("achievement") && msg.includes("progress")) return "Your achievement progress is shown in the Achievements section.";
    if (msg.includes("achievement") && msg.includes("future")) return "More achievements will be added soon!";
    if (msg.includes("achievement") && msg.includes("pro")) return "The 'Reading Pro' achievement is coming soon!";
    if (msg.includes("badge") || msg.includes("award")) return "Badges and awards are displayed in the Achievements section after you complete lessons.";
    if (msg.includes("how many achievements")) return `You have earned ${completedLessons.length} achievements so far.`;
    if (msg.includes("can i lose achievements")) return "No, once you earn an achievement, it's yours to keep.";
    if (msg.includes("can i earn achievements again")) return "Each achievement can only be earned once.";
    if (msg.includes("what is reading pro")) return "Reading Pro is a special achievement for advanced learners (coming soon).";
    if (msg.includes("how do i get badges")) return "Earn badges by completing lessons and achievements.";
    if (msg.includes("what are awards")) return "Awards are special recognitions for your learning progress.";

    // Navigation & Dashboard
    if (msg.includes("where") && msg.includes("lessons")) return "You can find all lessons by clicking 'View All' in the New Lessons or Continue Learning sections.";
    if (msg.includes("where") && msg.includes("achievements")) return "Achievements are shown in the Achievements section of your dashboard.";
    if (msg.includes("where") && msg.includes("progress")) return "Your progress is shown at the top of the dashboard.";
    if (msg.includes("where") && msg.includes("dashboard")) return "You are on the dashboard now!";
    if (msg.includes("dashboard")) return "The dashboard shows your progress, available lessons, and achievements.";
    if (msg.includes("how to use dashboard")) return "Use the dashboard to view your lessons, progress, and achievements.";
    if (msg.includes("what is dashboard")) return "The dashboard is your main page for tracking learning progress.";
    if (msg.includes("how do i navigate")) return "Use the dashboard sections and navigation links to explore SmartRead.";
    if (msg.includes("where is continue learning")) return "The 'Continue Learning' section is near the top of your dashboard.";
    if (msg.includes("where is new lessons")) return "The 'New Lessons' section is below 'Continue Learning' on your dashboard.";
    if (msg.includes("where is achievements")) return "The Achievements section is near the bottom of your dashboard.";
    if (msg.includes("how do i go back")) return "Use your browser's back button or dashboard navigation links.";
    if (msg.includes("how do i log out")) return "Use the menu or profile section to log out.";
    if (msg.includes("how do i change my name")) return "Profile editing is not available yet.";
    if (msg.includes("how do i change my password")) return "Password changes are managed in your account settings.";

    // Progress
    if (msg.includes("progress") && msg.includes("how")) return "Your progress is tracked automatically as you complete lessons.";
    if (msg.includes("progress") && msg.includes("see")) return "See your progress at the top of the dashboard.";
    if (msg.includes("progress") && msg.includes("bar")) return "The progress bar shows your lesson completion.";
    if (msg.includes("progress") && msg.includes("percentage")) return "The percentage shows how much of a lesson you've completed.";
    if (msg.includes("progress") && msg.includes("total")) return `You have completed ${completedLessons.length} out of ${lessons.length} lessons.`;
    if (msg.includes("progress") && msg.includes("reset")) return "Progress cannot be reset at this time.";
    if (msg.includes("progress") && msg.includes("history")) return "Your progress history is shown in the dashboard sections.";
    if (msg.includes("progress") && msg.includes("update")) return "Progress updates automatically as you work.";
    if (msg.includes("progress") && msg.includes("track")) return "SmartRead tracks your lesson and achievement progress.";
    if (msg.includes("how am i doing") || msg.includes("my progress")) return `You have completed ${completedLessons.length} lessons and have ${inProgressLessons.length} in progress.`;

    // Features & AI Chat
    if (msg.includes("ai chat")) return "The AI Chat helps answer your questions about SmartRead. Click the chat icon to start!";
    if (msg.includes("can you help me")) return "Yes! Ask me anything about SmartRead, lessons, or your progress.";
    if (msg.includes("can you recommend a lesson")) return "Try the newest lessons or the Vowel Lessons to get started!";
    if (msg.includes("can you explain achievements")) return "Achievements are earned by completing lessons.";
    if (msg.includes("can you explain dashboard")) return "The dashboard shows your learning progress and available lessons.";
    if (msg.includes("can you explain progress")) return "Progress shows how many lessons you've completed and your achievements.";
    if (msg.includes("can you explain new lessons")) return "New Lessons are the latest lessons added to SmartRead.";
    if (msg.includes("can you explain continue learning")) return "Continue Learning shows lessons you started but haven't finished.";
    if (msg.includes("can you explain vowel lessons")) return "Vowel Lessons help you practice A, E, I, O, U.";
    if (msg.includes("can you explain lesson cards")) return "Lesson cards show the title, description, difficulty, and author.";
    if (msg.includes("can you explain lesson difficulty")) return "Lessons are labeled easy, medium, or hard.";
    if (msg.includes("can you explain lesson progress")) return "Lesson progress shows how much of a lesson you've finished.";
    if (msg.includes("can you explain lesson achievements")) return "Complete lessons to earn achievements and badges.";

    // Fun & Misc
    if (msg.includes("tell me a joke")) return "Why did the student eat his homework? Because the teacher said it was a piece of cake!";
    if (msg.includes("motivate me")) return "Keep going! Every lesson completed is a step closer to your reading goals!";
    if (msg.includes("inspire me")) return "Learning is a treasure that will follow its owner everywhere.";
    if (msg.includes("thank you")) return "You're welcome! Happy learning!";
    if (msg.includes("thanks")) return "Glad to help!";

    // Default
    return "Sorry, I don't understand. Try asking about lessons, achievements, dashboard features, or how to use SmartRead!";
  };

  const sendMessage = () => {
    if (input.trim()) {
      setMessages(prev => [...prev, input]);
      const reply = getBotReply(input);
      setTimeout(() => {
        setMessages(prev => [...prev, reply]);
      }, 500);
      setInput('');
    }
  };
  // --- End chat box logic ---

  useEffect(() => {
    // Fetch all lessons
    const fetchLessons = async () => {
      const { data, error } = await supabase
        .from('lessons')
        .select('*');
      if (error) {
        console.error('Error fetching lessons:', error.message);
      }
      setLessons(data || []);
      setRecentLessons((data || []).slice(0, 3));
      setInProgressLessons((data || []).slice(1, 3));
      setCompletedLessons((data || []).slice(3, 5));
    };
    fetchLessons();
  }, []);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <div className="max-w-5xl mx-auto">
      {/* Welcome Banner */}
      <motion.div 
        className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 mb-8 text-white shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl md:text-3xl font-bold mb-2">
          Hello, {user?.username || 'Student'}!
        </h1>
        <p className="opacity-90">
          Welcome to your learning dashboard. Ready to continue your reading adventure?
        </p>
      </motion.div>
      
      {/* Progress Overview */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {[
          { 
            title: 'Lessons Completed', 
            value: completedLessons.length, 
            icon: <BookCheck className="text-white" size={24} />,
            color: 'bg-green-500' 
          },
          { 
            title: 'In Progress', 
            value: inProgressLessons.length, 
            icon: <BookText className="text-white" size={24} />,
            color: 'bg-yellow-500' 
          },
          { 
            title: 'Available Lessons', 
            value: lessons.length, 
            icon: <BookOpen className="text-white" size={24} />,
            color: 'bg-blue-500' 
          }
        ].map((stat, index) => (
          <motion.div 
            key={index} 
            className={`${stat.color} rounded-xl shadow-md p-4 text-white`}
            variants={itemVariants}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium opacity-90">{stat.title}</p>
                <h3 className="text-3xl font-bold mt-1">{stat.value}</h3>
              </div>
              <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                {stat.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      {/* Continue Learning Section */}
      <motion.section 
        className="mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Continue Learning</h2>
          <Link to="/student/lessons" className="text-blue-600 hover:text-blue-800 text-sm">
            View All
          </Link>
        </div>
        
        {inProgressLessons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {inProgressLessons.map((lesson: any) => (
              <Link key={lesson.id} to={`/student/lessons/${lesson.id}`}>
                <motion.div 
                  className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-yellow-500 hover:shadow-md transition-shadow"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-gray-800">{lesson.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{lesson.description.substring(0, 60)}...</p>
                    </div>
                    <div className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      In Progress
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '35%' }}></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">35% complete</div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <p className="text-gray-600">No lessons in progress. Start a new lesson!</p>
          </div>
        )}
      </motion.section>
      
      {/* New Lessons Section */}
      <motion.section 
        className="mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">New Lessons</h2>
          <Link to="/student/lessons" className="text-blue-600 hover:text-blue-800 text-sm">
            View All
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* Existing lesson cards */}
          {recentLessons.map((lesson: any) => (
            <Link key={lesson.id} to={`/student/lessons/${lesson.id}`}>
              <motion.div 
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <div className="h-24 bg-blue-100 flex items-center justify-center">
                  <BookOpen className="text-blue-500" size={32} />
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-gray-800">{lesson.title}</h3>
                      <p className="text-xs text-gray-500 mt-1">By {lesson.uploaded_by}</p>
                    </div>
                    <div className={`text-xs font-medium px-2 py-0.5 rounded ${
                      lesson.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                      lesson.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {lesson.difficulty}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{lesson.description.substring(0, 60)}...</p>
                </div>
              </motion.div>
            </Link>
          ))}

          {/* Vowel Lessons Card */}
          <Link to="/lessons/vowel">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-24 bg-blue-100 flex items-center justify-center">
                <span className="text-blue-500 text-4xl font-bold">A E I O U</span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-800">Vowel Lessons</h3>
                <p className="text-xs text-gray-500 mt-1">Practice A, E, I, O, U</p>
                <p className="text-sm text-gray-600 mt-2">Learn words and photos for each vowel!</p>
              </div>
            </div>
          </Link>
        </div>
      </motion.section>
      
      {/* Achievements Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <div className="flex items-center mb-4">
          <Award className="text-yellow-500 mr-2" size={24} />
          <h2 className="text-xl font-bold text-gray-800">Your Achievements</h2>
        </div>
        
        {completedLessons.length > 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {completedLessons.map((lesson: any, index: number) => (
                <motion.div 
                  key={index}
                  className="flex flex-col items-center text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index, duration: 0.3 }}
                >
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-2">
                    <Award className="text-yellow-500" size={32} />
                  </div>
                  <p className="text-sm font-medium text-gray-800">{lesson.title}</p>
                  <p className="text-xs text-gray-500">Completed</p>
                </motion.div>
              ))}
              
              {/* Placeholder for future achievements */}
              <motion.div 
                className="flex flex-col items-center text-center opacity-50"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.5, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.3 }}
              >
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-2 border-2 border-dashed border-gray-300">
                  <Award className="text-gray-400" size={32} />
                </div>
                <p className="text-sm font-medium text-gray-500">Reading Pro</p>
                <p className="text-xs text-gray-400">Coming soon</p>
              </motion.div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <p className="text-gray-600">Complete lessons to earn achievements!</p>
          </div>
        )}
      </motion.section>

      {/* AI Chat Icon & Chat Box */}
      {!chatOpen ? (
        <div
          className="fixed bottom-4 right-4"
          style={{ zIndex: 50 }}
        >
          <button
            className="relative group p-0 m-0 bg-transparent border-none shadow-none"
            onClick={() => setChatOpen(true)}
            aria-label="Open AI Chat"
            type="button"
            style={{ display: 'block' }}
          >
            {/* Text bubble appears on hover */}
            <img
              src={textBubble}
              alt="Chat Bubble"
              className="absolute right-[170px] bottom-[65%] translate-y-1/2 transition-opacity duration-200 opacity-0 group-hover:opacity-100 pointer-events-none"
              style={{ width: 90, height: 'auto' }}
            />
            <img
              src={aiIcon}
              alt="AI Chat"
              style={{ width: 180, height: 180, objectFit: 'contain', display: 'block', filter: 'drop-shadow(0 0 12px #60a5fa)' }}
            />
            <span className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-yellow-300 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full shadow-lg border-2 border-yellow-400 animate-bounce">
              Ask Me!
            </span>
          </button>
        </div>
      ) : (
        <div className="fixed bottom-4 right-4 w-80 bg-gradient-to-br from-blue-100 via-yellow-100 to-pink-100 rounded-2xl shadow-2xl flex flex-col border-4 border-blue-300" style={{ zIndex: 50 }}>
          <div className="p-3 border-b-2 border-blue-200 font-bold bg-blue-400 text-white rounded-t-2xl flex justify-between items-center">
            <span className="flex items-center gap-2">
              <img src={aiIcon} alt="AI" className="w-8 h-8 rounded-full border-2 border-yellow-300 bg-white" />
              <span>SmartRead Buddy</span>
              <span className="ml-2 text-yellow-200 text-lg animate-wiggle">👋</span>
            </span>
            <div className="flex gap-2">
              <button
                className="text-xs bg-white text-blue-500 px-2 py-1 rounded hover:bg-blue-100 transition font-bold"
                onClick={() => setMessages([])}
                title="Refresh chat"
                type="button"
              >
                🔄
              </button>
              <button
                className="text-xs bg-white text-blue-500 px-2 py-1 rounded hover:bg-blue-100 transition font-bold"
                onClick={() => setChatOpen(false)}
                title="Close chat"
                type="button"
              >
                ✕
              </button>
            </div>
          </div>
          <div className="flex-1 p-3 overflow-y-auto" style={{ maxHeight: 220 }}>
            {messages.length === 0 && (
              <div className="mb-4 text-center text-blue-600 font-semibold">
                👋 Hi! I'm your SmartRead Buddy.<br />
                Ask me anything about your lessons or just say hello!
              </div>
            )}
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`mb-2 text-sm px-3 py-2 rounded-lg max-w-[85%] ${
                  idx % 2 === 0
                    ? "bg-yellow-200 text-yellow-900 self-end ml-auto rounded-br-none shadow"
                    : "bg-blue-200 text-blue-900 self-start mr-auto rounded-bl-none shadow"
                }`}
                style={{ wordBreak: "break-word" }}
              >
                {msg}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="flex border-t-2 border-blue-200 p-2 bg-white rounded-b-2xl">
            <input
              type="text"
              className="flex-1 border-2 border-blue-200 rounded-l-xl px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-300 text-lg"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={async e => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  await sendMessage();
                }
              }}
              placeholder="Type your question..."
            />
            <button
              className="bg-yellow-400 text-yellow-900 px-4 rounded-r-xl font-bold hover:bg-yellow-300 transition text-lg"
              onClick={sendMessage}
              type="button"
            >
              🚀
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;