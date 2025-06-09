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
      className="min-h-screen flex flex-col justify-center items-center px-2 sm:px-0"
      style={{
        background: 'linear-gradient(to top, #aee1f9 0%, #f9fafc 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Back to Dashboard Button */}
      <div className="absolute top-4 left-2 sm:top-6 sm:left-6 z-20">
        <Link
          to="/student"
          className="bg-yellow-400 hover:bg-yellow-300 text-blue-800 font-bold py-2 px-4 sm:px-6 rounded-full shadow-lg text-base sm:text-lg transition-colors duration-200 border-2 border-white"
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
          top: 20,
          left: 20,
          width: 80,
          height: 40,
          background: '#fff',
          borderRadius: '50%',
          opacity: 0.5,
          zIndex: 0,
        }}
        className="hidden sm:block"
      />
      <div
        style={{
          position: 'absolute',
          top: 80,
          right: 30,
          width: 60,
          height: 30,
          background: '#fff',
          borderRadius: '50%',
          opacity: 0.4,
          zIndex: 0,
        }}
        className="hidden sm:block"
      />

      <h1 className="text-2xl sm:text-4xl font-extrabold mb-8 text-center text-blue-700 drop-shadow-lg z-10">
        Choose a Vowel!
      </h1>
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 sm:gap-8 z-10 w-full max-w-xs sm:max-w-2xl mx-auto mb-4">
        {vowels.map(({ letter, color, emoji }, idx) => (
          <Link
            key={letter}
            to={`/lessons/vowel/${letter.toLowerCase()}`}
            className={`
      flex flex-col items-center justify-center ${color}
      hover:scale-110 transition-transform duration-200 shadow-lg rounded-full
      aspect-square w-20 h-20 xs:w-28 xs:h-28 sm:w-36 sm:h-36 md:w-44 md:h-44
      overflow-hidden
      ${idx === 4 ? 'col-start-2 sm:col-start-auto' : ''}
    `}
            style={{
              border: '4px solid #fff',
              boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
            }}
          >
            <span className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl mb-2">{emoji}</span>
            <span className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold tracking-wider text-white">{letter}</span>
          </Link>
        ))}
      </div>
      <div className="mt-8 sm:mt-10 text-base sm:text-lg text-blue-600 font-semibold z-10 text-center">
        Tap a vowel to start learning!
      </div>
    </div>
  );
}