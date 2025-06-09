import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';

const vowelWords: Record<string, string[]> = {
  a: ['bat', 'cap', 'cat', 'fan', 'hat', 'jam', 'man', 'mat', 'pan', 'rat'],
  e: ['bed', 'hen', 'jet', 'leg', 'men', 'net', 'pen', 'pet', 'red', 'ten'],
  i: ['big', 'dig', 'fig', 'fin', 'kid', 'lid', 'pig', 'pin', 'sit', 'win'],
  o: ['cop', 'dog', 'dot', 'fog', 'hop', 'log', 'mop', 'pop', 'pot', 'top'],
  u: ['bun', 'cup', 'fun', 'hug', 'mug', 'pup', 'run', 'sun', 'tug'],
};

const wordSentences: Record<string, string> = {
  bat: "The bat flies at night.",
  cap: "He wears a red cap.",
  cat: "The cat is sleeping.",
  fan: "The fan is spinning fast.",
  hat: "She has a big hat.",
  jam: "I like strawberry jam.",
  man: "The man is tall.",
  mat: "Wipe your feet on the mat.",
  pan: "The pan is hot.",
  rat: "A rat ran across the room.",
  bed: "I sleep in my bed.",
  hen: "The hen lays eggs.",
  jet: "The jet is very fast.",
  leg: "My leg hurts.",
  men: "The men are working.",
  net: "The fish is in the net.",
  pen: "I write with a pen.",
  pet: "My pet is a dog.",
  red: "The apple is red.",
  ten: "I have ten fingers.",
  big: "The dog is big.",
  dig: "We dig in the sand.",
  fig: "A fig is a fruit.",
  fin: "The fish has a fin.",
  kid: "The kid is happy.",
  lid: "Put the lid on the box.",
  pig: "The pig is pink.",
  pin: "I found a pin.",
  sit: "Please sit down.",
  win: "I want to win.",
  cop: "The cop helps people.",
  dog: "The dog barks.",
  dot: "Draw a dot on the paper.",
  fog: "The fog is thick.",
  hop: "The frog can hop.",
  log: "The log is heavy.",
  mop: "Use a mop to clean.",
  pop: "I like to pop bubbles.",
  pot: "The pot is on the stove.",
  top: "The top spins fast.",
  bun: "I ate a bun.",
  cup: "The cup is full.",
  fun: "We have fun at the park.",
  hug: "Give me a hug.",
  mug: "This mug is blue.",
  pup: "The pup is small.",
  run: "I run fast.",
  sun: "The sun is bright.",
  tug: "They tug the rope.",
};

export default function PhotoWordVowelLesson() {
  const { vowel } = useParams<{ vowel: string }>();
  const words = vowel ? vowelWords[vowel] : [];
  const [index, setIndex] = useState(0);

  // Spell the Word state
  const [showSpell, setShowSpell] = useState(false);
  const [spellIndex, setSpellIndex] = useState(0);

  // Use in a sentence state
  const [showSentence, setShowSentence] = useState(false);
  const [sentence, setSentence] = useState('');

  if (!vowel || !words.length) {
    return (
      <div className="max-w-xl mx-auto py-10 text-center">
        <h1 className="text-2xl font-bold mb-4">Vowel not found</h1>
        <Link to="/lessons/vowel" className="text-blue-600 underline">Back to Vowel Select</Link>
      </div>
    );
  }

  const word = words[index];
  const imageSrc = `/flashcards/${word}.png`;

  // Function to spell the word with voice
  const handleSpellTheWord = async () => {
    setShowSpell(true);
    setSpellIndex(0);
    for (let i = 0; i < word.length; i++) {
      setSpellIndex(i);
      await speakLetter(word[i]); // Wait for the letter to finish before next
      await new Promise(res => setTimeout(res, 600)); // Slight pause after voice
    }
    // Wait a bit before closing
    setTimeout(() => setShowSpell(false), 1200);
  };

  // Function to use the word in a sentence
  const handleUseInSentence = () => {
    const s = wordSentences[word] || `This is a ${word}.`;
    setSentence(s);
    setShowSentence(true);
    speakSentence(s);
  };

  // Use browser speech synthesis to say a letter, prefer girl child voice
  function speakLetter(letter: string) {
    return new Promise<void>(resolve => {
      const synth = window.speechSynthesis;
      const utter = new window.SpeechSynthesisUtterance(letter);
      utter.rate = 0.7;
      utter.lang = 'en-US';

      // Try to pick a child-like female voice if available
      const voices = synth.getVoices();
      const childVoice = voices.find(
        v =>
          v.lang.startsWith('en') &&
          (v.name.toLowerCase().includes('child') ||
            v.name.toLowerCase().includes('kid') ||
            v.name.toLowerCase().includes('girl') ||
            v.name.toLowerCase().includes('female') ||
            v.name.toLowerCase().includes('woman'))
      ) || voices.find(v => v.lang.startsWith('en')) || voices[0];

      if (childVoice) utter.voice = childVoice;

      utter.onend = () => resolve();
      synth.speak(utter);
    });
  }

  // Use browser speech synthesis to say a sentence, prefer girl child voice
  function speakSentence(text: string) {
    const synth = window.speechSynthesis;
    const utter = new window.SpeechSynthesisUtterance(text);
    utter.rate = 0.85;
    utter.lang = 'en-US';

    // Prefer a girl child voice if available
    const voices = synth.getVoices();
    const childVoice = voices.find(
      v =>
        v.lang.startsWith('en') &&
        (v.name.toLowerCase().includes('child') ||
          v.name.toLowerCase().includes('kid') ||
          v.name.toLowerCase().includes('girl') ||
          v.name.toLowerCase().includes('female') ||
          v.name.toLowerCase().includes('woman'))
    ) || voices.find(v => v.lang.startsWith('en')) || voices[0];

    if (childVoice) utter.voice = childVoice;

    synth.speak(utter);
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-2 sm:px-0"
      style={{
        background: 'linear-gradient(to top, #aee1f9 0%, #f9fafc 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top bar with Back button and Heading */}
      <div
        className="w-full flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 sm:pt-10 mb-6 sm:mb-8"
        style={{ maxWidth: 1200 }}
      >
        <div className="w-full sm:flex-1 flex justify-start mb-2 sm:mb-0">
          <Link
            to="/lessons/vowel"
            className="bg-yellow-400 hover:bg-yellow-300 text-blue-800 font-bold py-2 sm:py-3 px-4 sm:px-8 rounded-full shadow-lg text-base sm:text-xl transition-colors duration-200 border-2 border-yellow-200 flex items-center gap-2"
            style={{
              boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
              letterSpacing: 1,
            }}
          >
            <span className="text-xl sm:text-2xl">⬅️</span> <span className="hidden xs:inline">Back to Vowel Select</span>
          </Link>
        </div>
        <div className="w-full sm:flex-1 flex justify-center">
          <h1
            className="text-2xl xs:text-3xl sm:text-5xl font-extrabold text-blue-700 text-center"
            style={{
              fontFamily: 'Comic Sans MS, Comic Sans, cursive',
              textShadow: '0 4px 16px #e3e8f0',
              letterSpacing: 1,
            }}
          >
            {`Let's Learn Words with "${vowel?.toUpperCase()}"!`}
          </h1>
        </div>
        <div className="hidden sm:flex sm:flex-1" />
      </div>

      {/* Decorative clouds */}
      <div
        style={{
          position: 'absolute',
          top: 20,
          left: 10,
          width: 70,
          height: 35,
          background: '#fff',
          borderRadius: '50%',
          opacity: 0.5,
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 80,
          right: 20,
          width: 60,
          height: 30,
          background: '#fff',
          borderRadius: '50%',
          opacity: 0.4,
          zIndex: 0,
        }}
      />

      {/* Flashcard */}
      <div
        className="flex flex-col items-center justify-center z-10 w-full max-w-[95vw] sm:max-w-[400px]"
        style={{
          background: '#fff',
          borderRadius: 24,
          boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
          padding: '1.5rem 0.5rem',
          border: '3px solid #e3e8f0',
        }}
      >
        {/* Circular border with image overlapping */}
        <div
          style={{
            position: 'relative',
            width: 110,
            height: 110,
            marginBottom: 16,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#f9fafc',
            borderRadius: '50%',
            border: '2px solid #eab308',
          }}
          className="sm:w-[180px] sm:h-[180px]"
        >
          <img
            src={imageSrc}
            alt={word}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: 300,
              height: 300,
              transform: 'translate(-50%, -50%)',
              objectFit: 'contain',
              pointerEvents: 'none',
            }}
            className="sm:w-[900px] sm:h-[900px]"
            onError={e => (e.currentTarget.src = '/flashcards/placeholder.png')}
          />
        </div>
        {/* Word */}
        <div className="text-2xl sm:text-4xl font-extrabold text-[#a94442] mb-6 capitalize font-[Comic Sans MS,cursive,sans-serif] tracking-wide text-center">
          {word}
        </div>
        {/* Navigation and action buttons */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-3 w-full">
          <button
            className="bg-blue-200 hover:bg-blue-300 text-blue-800 px-4 sm:px-8 py-2 sm:py-3 rounded-full font-bold text-base sm:text-lg shadow transition-all duration-200 disabled:opacity-50"
            onClick={() => setIndex(i => Math.max(i - 1, 0))}
            disabled={index === 0}
          >
            ← Previous
          </button>
          <button
            className="bg-blue-400 hover:bg-blue-500 text-white px-4 sm:px-8 py-2 sm:py-3 rounded-full font-bold text-base sm:text-lg shadow transition-all duration-200 disabled:opacity-50"
            onClick={() => setIndex(i => Math.min(i + 1, words.length - 1))}
            disabled={index === words.length - 1}
          >
            Next →
          </button>
        </div>
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-2 w-full">
          <button
            className="bg-pink-200 hover:bg-pink-300 text-[#a94442] px-4 sm:px-8 py-2 sm:py-3 rounded-full font-bold text-base sm:text-lg shadow transition-all duration-200"
            onClick={handleUseInSentence}
          >
            🔊 Use in a sentence
          </button>
          <button
            className="bg-yellow-300 hover:bg-yellow-400 text-[#6d4c00] px-4 sm:px-8 py-2 sm:py-3 rounded-full font-bold text-base sm:text-lg shadow transition-all duration-200"
            onClick={handleSpellTheWord}
          >
            🟦 Spell the Word
          </button>
        </div>
        {index === words.length - 1 && (
          <Link
            to={`/lessons/vowel/${vowel}/quiz`}
            className="mt-3 sm:mt-4 bg-green-400 hover:bg-green-500 text-white px-6 sm:px-10 py-3 sm:py-4 rounded-full font-bold text-lg sm:text-xl shadow-lg transition-all duration-200"
          >
            🎉 Take Quiz!
          </Link>
        )}
      </div>
      <div className="mt-5 sm:mt-8 text-base sm:text-lg text-blue-600 font-semibold z-10 text-center">
        Tap the arrows to see more words!
      </div>

      {/* Spell the Word Popup */}
      {showSpell && (
        <div
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.3)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: 18,
              padding: '2rem 1.5rem',
              boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
              fontSize: '3rem',
              fontWeight: 'bold',
              color: '#2563eb',
              fontFamily: 'Comic Sans MS, Comic Sans, cursive',
              minWidth: 80,
              textAlign: 'center',
            }}
            className="sm:p-[3rem_4rem] sm:text-[5rem] sm:min-w-[120px]"
          >
            {word[spellIndex]?.toUpperCase()}
          </div>
        </div>
      )}

      {/* Use in a Sentence Popup */}
      {showSentence && (
        <div
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.3)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={() => setShowSentence(false)}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: 18,
              padding: '1.5rem 1rem',
              boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              color: '#a94442',
              fontFamily: 'Comic Sans MS, Comic Sans, cursive',
              minWidth: 120,
              textAlign: 'center',
              cursor: 'pointer',
            }}
            className="sm:p-[2rem_3rem] sm:text-[2rem] sm:min-w-[200px]"
          >
            {sentence}
            <div style={{ fontSize: '0.9rem', color: '#888', marginTop: 12 }} className="sm:text-[1rem] sm:mt-4">
              (Click anywhere to close)
            </div>
          </div>
        </div>
      )}
    </div>
  );
}