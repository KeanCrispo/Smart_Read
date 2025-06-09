import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';

const quizData: Record<string, { question: string; options: string[]; answer: string }[]> = {
  a: [
    { question: 'Which word starts with the vowel "A"?', options: ['apple', 'dog', 'cat', 'sun'], answer: 'apple' },
    { question: 'Which word has the vowel "A" in the middle?', options: ['cap', 'bed', 'cup', 'dog'], answer: 'cap' },
    { question: 'Which word rhymes with "cat"?', options: ['bat', 'dog', 'sun', 'cup'], answer: 'bat' },
    { question: 'Which word is an animal?', options: ['fan', 'man', 'cat', 'pan'], answer: 'cat' },
    { question: 'Which word is something you wear?', options: ['hat', 'rat', 'fan', 'mat'], answer: 'hat' },
    { question: 'Which word is a kitchen item?', options: ['pan', 'cap', 'cat', 'man'], answer: 'pan' },
    { question: 'Which word means a male adult?', options: ['man', 'fan', 'jam', 'mat'], answer: 'man' },
    { question: 'Which word is a sweet food?', options: ['jam', 'fan', 'rat', 'cap'], answer: 'jam' },
    { question: 'Which word is used to wipe your feet?', options: ['mat', 'cat', 'fan', 'pan'], answer: 'mat' },
    { question: 'Which word is a small animal?', options: ['rat', 'fan', 'cap', 'jam'], answer: 'rat' },
  ],
  e: [
    { question: 'Which word starts with the vowel "E"?', options: ['egg', 'dog', 'cat', 'sun'], answer: 'egg' },
    { question: 'Which word is a place to sleep?', options: ['bed', 'pen', 'jet', 'leg'], answer: 'bed' },
    { question: 'Which word is a bird?', options: ['hen', 'jet', 'leg', 'red'], answer: 'hen' },
    { question: 'Which word is a vehicle?', options: ['jet', 'pen', 'bed', 'pet'], answer: 'jet' },
    { question: 'Which word is part of your body?', options: ['leg', 'net', 'hen', 'red'], answer: 'leg' },
    { question: 'Which word means more than one man?', options: ['men', 'pen', 'pet', 'ten'], answer: 'men' },
    { question: 'Which word is used to catch fish?', options: ['net', 'pet', 'red', 'hen'], answer: 'net' },
    { question: 'Which word is used for writing?', options: ['pen', 'bed', 'jet', 'leg'], answer: 'pen' },
    { question: 'Which word is a color?', options: ['red', 'hen', 'net', 'ten'], answer: 'red' },
    { question: 'Which word is a number?', options: ['ten', 'pen', 'pet', 'bed'], answer: 'ten' },
  ],
  i: [
    { question: 'Which word is a fruit?', options: ['fig', 'pig', 'kid', 'win'], answer: 'fig' },
    { question: 'Which word is a small child?', options: ['kid', 'lid', 'fig', 'sit'], answer: 'kid' },
    { question: 'Which word is a part of a container?', options: ['lid', 'pig', 'win', 'dig'], answer: 'lid' },
    { question: 'Which word is a farm animal?', options: ['pig', 'fig', 'kid', 'sit'], answer: 'pig' },
    { question: 'Which word is used to attach things?', options: ['pin', 'win', 'dig', 'fin'], answer: 'pin' },
    { question: 'Which word means to dig in the ground?', options: ['dig', 'fig', 'win', 'sit'], answer: 'dig' },
    { question: 'Which word means to sit down?', options: ['sit', 'win', 'kid', 'fig'], answer: 'sit' },
    { question: 'Which word means to win a game?', options: ['win', 'dig', 'fig', 'lid'], answer: 'win' },
    { question: 'Which word is a part of a fish?', options: ['fin', 'kid', 'pig', 'sit'], answer: 'fin' },
    { question: 'Which word is big in size?', options: ['big', 'dig', 'fig', 'win'], answer: 'big' },
  ],
  o: [
    { question: 'Which word is a pet?', options: ['dog', 'cop', 'fog', 'pot'], answer: 'dog' },
    { question: 'Which word is a police officer?', options: ['cop', 'dog', 'dot', 'pop'], answer: 'cop' },
    { question: 'Which word is a small round mark?', options: ['dot', 'fog', 'hop', 'log'], answer: 'dot' },
    { question: 'Which word is thick mist?', options: ['fog', 'dog', 'cop', 'pot'], answer: 'fog' },
    { question: 'Which word means to jump?', options: ['hop', 'log', 'pop', 'dog'], answer: 'hop' },
    { question: 'Which word is a piece of wood?', options: ['log', 'pot', 'dog', 'cop'], answer: 'log' },
    { question: 'Which word is used for cleaning?', options: ['mop', 'pop', 'pot', 'dog'], answer: 'mop' },
    { question: 'Which word means to burst?', options: ['pop', 'mop', 'pot', 'dog'], answer: 'pop' },
    { question: 'Which word is used for cooking?', options: ['pot', 'dog', 'cop', 'log'], answer: 'pot' },
    { question: 'Which word is a spinning toy?', options: ['top', 'pot', 'dog', 'cop'], answer: 'top' },
  ],
  u: [
    { question: 'Which word is a baked food?', options: ['bun', 'cup', 'fun', 'run'], answer: 'bun' },
    { question: 'Which word is used for drinking?', options: ['cup', 'bun', 'fun', 'run'], answer: 'cup' },
    { question: 'Which word means enjoyment?', options: ['fun', 'cup', 'bun', 'run'], answer: 'fun' },
    { question: 'Which word means to embrace?', options: ['hug', 'cup', 'bun', 'fun'], answer: 'hug' },
    { question: 'Which word is a type of mug?', options: ['mug', 'cup', 'bun', 'fun'], answer: 'mug' },
    { question: 'Which word is a baby dog?', options: ['pup', 'cup', 'bun', 'fun'], answer: 'pup' },
    { question: 'Which word means to move fast?', options: ['run', 'cup', 'bun', 'fun'], answer: 'run' },
    { question: 'Which word is a star in the sky?', options: ['sun', 'cup', 'bun', 'fun'], answer: 'sun' },
    { question: 'Which word means to pull hard?', options: ['tug', 'cup', 'bun', 'fun'], answer: 'tug' },
    { question: 'Which word is a friendly gesture?', options: ['hug', 'cup', 'bun', 'fun'], answer: 'hug' },
  ],
};

export default function PhotoWordVowelQuiz() {
  const { vowel } = useParams<{ vowel: string }>();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  if (!vowel || !quizData[vowel]) return <div>Quiz not found.</div>;

  const questions = quizData[vowel];
  const { question, options, answer } = questions[questionIndex];

  const handleSubmit = () => {
    if (selected === answer) setScore(s => s + 1);
    setShowResult(true);
  };

  const handleNext = () => {
    setShowResult(false);
    setSelected(null);
    setQuestionIndex(i => i + 1);
  };

  const isQuizEnd = questionIndex === questions.length - 1 && showResult;

  // --- CHILD-FRIENDLY STYLES ---
  const bgGradient = "linear-gradient(135deg, #f9fafc 0%, #aee1f9 100%)";
  const cardStyle = {
    background: "#fffbe7",
    borderRadius: 32,
    boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
    padding: "2.5rem 2rem",
    border: "4px solid #ffe066",
    maxWidth: 480,
    margin: "0 auto",
    fontFamily: '"Comic Sans MS", Comic Sans, cursive',
    position: "relative" as const,
  };
  const questionStyle = {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#2563eb",
    marginBottom: "1.5rem",
    textAlign: "center" as const,
    textShadow: "0 2px 8px #e3e8f0",
    letterSpacing: 1,
  };
  const optionStyle = (selected: boolean) => ({
    background: selected ? "#ffe066" : "#f9fafc",
    color: "#a94442",
    border: "2px solid #ffe066",
    borderRadius: 18,
    fontSize: "1.5rem",
    fontWeight: "bold",
    padding: "1.2rem 0.5rem",
    margin: "0.5rem",
    cursor: "pointer",
    boxShadow: selected ? "0 4px 16px #ffe066" : "0 2px 8px #e3e8f0",
    transition: "all 0.2s",
    outline: "none",
    width: "100%",
    minWidth: 120,
  });
  const btnStyle = {
    background: "#ffb347",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "1.3rem",
    border: "none",
    borderRadius: 18,
    padding: "0.8rem 2.5rem",
    marginTop: "1.5rem",
    boxShadow: "0 2px 8px #ffe066",
    cursor: "pointer",
    letterSpacing: 1,
    transition: "all 0.2s",
  };
  const correctStyle = {
    color: "#22c55e",
    fontWeight: "bold",
    fontSize: "1.5rem",
    marginTop: "1rem",
    textShadow: "0 2px 8px #e3e8f0",
  };
  const wrongStyle = {
    color: "#ef4444",
    fontWeight: "bold",
    fontSize: "1.5rem",
    marginTop: "1rem",
    textShadow: "0 2px 8px #e3e8f0",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: bgGradient,
        padding: "2rem 0",
        fontFamily: '"Comic Sans MS", Comic Sans, cursive',
        position: "relative",
      }}
    >
      {/* Decorative clouds */}
      <div style={{
        position: "absolute", top: 30, left: 60, width: 120, height: 60,
        background: "#fff", borderRadius: "50%", opacity: 0.5, zIndex: 0,
      }} />
      <div style={{
        position: "absolute", top: 120, right: 80, width: 100, height: 50,
        background: "#fff", borderRadius: "50%", opacity: 0.4, zIndex: 0,
      }} />

      <div style={cardStyle} className="z-10">
        <h1 style={{
          fontSize: "2.5rem",
          fontWeight: "bold",
          color: "#f59e42",
          textAlign: "center",
          marginBottom: "1.5rem",
          letterSpacing: 2,
          textShadow: "0 4px 16px #ffe066",
        }}>
          Quiz: <span style={{ color: "#2563eb" }}>{vowel.toUpperCase()}</span>
        </h1>
        {!isQuizEnd ? (
          <>
            <div style={questionStyle}>{question}</div>
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1.2rem",
              marginBottom: "2rem",
            }}>
              {options.map(opt => (
                <button
                  key={opt}
                  onClick={() => setSelected(opt)}
                  style={optionStyle(selected === opt)}
                  disabled={showResult}
                  aria-label={opt}
                >
                  {opt}
                </button>
              ))}
            </div>
            {selected && !showResult && (
              <button
                style={btnStyle}
                onClick={handleSubmit}
              >
                🎉 Submit
              </button>
            )}
            {showResult && (
              <div>
                {selected === answer ? (
                  <div style={correctStyle}>🎉 Correct! Great job!</div>
                ) : (
                  <div style={wrongStyle}>❌ Oops! The answer is <b>{answer}</b>.</div>
                )}
                {questionIndex < questions.length - 1 ? (
                  <button
                    style={btnStyle}
                    onClick={handleNext}
                  >
                    Next Question →
                  </button>
                ) : (
                  <button
                    style={btnStyle}
                    onClick={handleNext}
                  >
                    See My Score!
                  </button>
                )}
              </div>
            )}
          </>
        ) : (
          <div style={{ textAlign: "center", position: "relative" }}>
            {/* Raining emoji effect */}
            {score === questions.length && (
              <div style={{
                position: "absolute",
                left: 0, right: 0, top: 0, bottom: 0,
                pointerEvents: "none",
                zIndex: 2,
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "flex-start",
                height: "100%",
                fontSize: "2.5rem",
                opacity: 0.85,
                animation: "rain 1.5s linear infinite",
              }}>
                {Array.from({ length: 18 }).map((_, i) => (
                  <span key={i} style={{
                    position: "absolute",
                    left: `${(i * 5.5 + Math.random() * 2)}%`,
                    top: `${Math.random() * 80}%`,
                    animation: `rainDrop 1.2s linear ${i * 0.1}s infinite`,
                  }}>
                    {i % 2 === 0 ? "👏" : "🎉"}
                  </span>
                ))}
              </div>
            )}
            {score < 5 && (
              <div style={{
                position: "absolute",
                left: 0, right: 0, top: 0, bottom: 0,
                pointerEvents: "none",
                zIndex: 2,
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "flex-start",
                height: "100%",
                fontSize: "2.5rem",
                opacity: 0.85,
                animation: "rain 1.5s linear infinite",
              }}>
                {Array.from({ length: 18 }).map((_, i) => (
                  <span key={i} style={{
                    position: "absolute",
                    left: `${(i * 5.5 + Math.random() * 2)}%`,
                    top: `${Math.random() * 80}%`,
                    animation: `rainDrop 1.2s linear ${i * 0.1}s infinite`,
                  }}>🌧️</span>
                ))}
              </div>
            )}
            <div style={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              color: "#22c55e",
              marginBottom: "1.5rem",
              textShadow: "0 4px 16px #e3e8f0",
              position: "relative",
              zIndex: 3,
            }}>
              🎉 Quiz Finished!
            </div>
            <div style={{
              fontSize: "2rem",
              color: "#2563eb",
              marginBottom: "1.5rem",
              fontWeight: "bold",
              position: "relative",
              zIndex: 3,
            }}>
              Your Score: <span style={{ color: "#f59e42" }}>{score}</span> / {questions.length}
            </div>
            <div style={{
              fontSize: "2rem",
              color: "#f59e42",
              marginBottom: "1.5rem",
              fontWeight: "bold",
              position: "relative",
              zIndex: 3,
            }}>
              {score === questions.length && "Amazing! Perfect score! You're a superstar! 🌟"}
              {score >= 8 && score < questions.length && "Great job! You're getting really good! 👍"}
              {score >= 5 && score < 8 && "Nice try! Keep practicing and you'll get even better! 😊"}
              {score < 5 && "Don't give up! Practice makes perfect! 💪"}
            </div>
            <Link to="/lessons/vowel"
              style={{
                ...btnStyle,
                background: "#2563eb",
                color: "#fff",
                marginTop: "1.5rem",
                textDecoration: "none",
                position: "relative",
                zIndex: 3,
              }}>
              ⬅️ Back to Vowel List
            </Link>
            {/* Keyframes for raining effect */}
            <style>
              {`
                @keyframes rainDrop {
                  0% { transform: translateY(-40px) scale(1); opacity: 0.7; }
                  80% { opacity: 1; }
                  100% { transform: translateY(120px) scale(1.2); opacity: 0; }
                }
              `}
            </style>
          </div>
        )}
      </div>
      {/* Fun emoji footer */}
      <div style={{
        textAlign: "center",
        marginTop: "2.5rem",
        fontSize: "2rem",
        color: "#f59e42",
        fontFamily: '"Comic Sans MS", Comic Sans, cursive',
        letterSpacing: 1,
        textShadow: "0 2px 8px #ffe066",
      }}>
        ⭐ Good luck! ⭐
      </div>
    </div>
  );
}