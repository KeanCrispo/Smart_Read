import { Link } from 'react-router-dom';

const vowels = [
  { letter: 'A', color: 'bg-red-400', emoji: '🍎' },
  { letter: 'E', color: 'bg-yellow-300', emoji: '🐘' },
  { letter: 'I', color: 'bg-green-300', emoji: '🍦' },
  { letter: 'O', color: 'bg-blue-300', emoji: '🐙' },
  { letter: 'U', color: 'bg-purple-300', emoji: '🦄' },
];

export default function PhotoWordVowelSelect() {
  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center"
      style={{
        background: 'linear-gradient(to top, #aee1f9 0%, #f9fafc 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Back to Dashboard Button */}
      <div className="absolute top-6 left-6 z-20">
        <Link
          to="/student"
          className="bg-yellow-400 hover:bg-yellow-300 text-blue-800 font-bold py-2 px-6 rounded-full shadow-lg text-lg transition-colors duration-200 border-2 border-white"
          style={{
            boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
            letterSpacing: 1,
          }}
        >
          ⬅️ Back to Dashboard
        </Link>
      </div>

      {/* Decorative clouds */}
      <div
        style={{
          position: 'absolute',
          top: 40,
          left: 60,
          width: 120,
          height: 60,
          background: '#fff',
          borderRadius: '50%',
          opacity: 0.5,
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 120,
          right: 80,
          width: 100,
          height: 50,
          background: '#fff',
          borderRadius: '50%',
          opacity: 0.4,
          zIndex: 0,
        }}
      />

      <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-700 drop-shadow-lg z-10">
        Choose a Vowel!
      </h1>
      <div className="flex justify-center gap-8 z-10">
        {vowels.map(({ letter, color, emoji }) => (
          <Link
            key={letter}
            to={`/lessons/vowel/${letter.toLowerCase()}`}
            className={`flex flex-col items-center justify-center ${color} hover:scale-110 transition-transform duration-200 shadow-lg rounded-full w-28 h-28 md:w-32 md:h-32`}
            style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              color: '#fff',
              border: '4px solid #fff',
              boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
            }}
          >
            <span style={{ fontSize: '2.5rem', marginBottom: 4 }}>{emoji}</span>
            <span style={{ fontSize: '2.5rem', letterSpacing: 2 }}>{letter}</span>
          </Link>
        ))}
      </div>
      <div className="mt-10 text-lg text-blue-600 font-semibold z-10">
        Tap a vowel to start learning!
      </div>
    </div>
  );
}