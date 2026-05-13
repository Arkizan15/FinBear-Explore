import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API_URL from "../config";

function QuizDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showIntro, setShowIntro] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState({ correct: 0, wrong: 0 });
  const [showResult, setShowResult] = useState(false);
  const [isEligible, setIsEligible] = useState(false);
  const [checkingProgress, setCheckingProgress] = useState(true);

  useEffect(() => {
    const fetchQuizAndCheckProgress = async () => {
      try {
        const response = await fetch(`${API_URL}/kuis/${id}`);
        const data = await response.json();
        setQuiz(data);

        if (!user) {
          setCheckingProgress(false);
          return;
        }

        const progressResponse = await fetch(
          `${API_URL}/user/progress/${user.id}/${data.moduleId}`,
        );
        const progressData = await progressResponse.json();
        setIsEligible(progressData.completed);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
        setCheckingProgress(false);
      }
    };
    fetchQuizAndCheckProgress();
  }, [id, user]);

  useEffect(() => {
    const totalScore = Math.round(
      (score.correct / quiz?.questions.length) * 100,
    );
    if (showResult && totalScore >= 70) {
      handleClaimPoints();
    }
  }, [showResult]);

  if (loading || checkingProgress) return <div>Loading...</div>;
  if (!quiz) return <div>Kuis tidak ditemukan</div>;

  if (!user) {
    navigate("/notregistered");
    return null;
  }

  const handleAnswer = (index) => {
    if (isAnswered) return;
    setSelectedAnswer(index);
    setIsAnswered(true);
    if (index === quiz.questions[currentQuestion].answer) {
      setScore((prev) => ({ ...prev, correct: prev.correct + 1 }));
    } else {
      setScore((prev) => ({ ...prev, wrong: prev.wrong + 1 }));
    }
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const handleClaimPoints = async () => {
    try {
      const response = await fetch(`${API_URL}/user/points`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          points: quiz.points,
          moduleId: `quiz_${quiz.id}`,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setUser({ ...user, points: data.points });
      }
    } catch (error) {
      console.error("Error claiming points:", error);
    }
  };

  if (!isEligible)
    return (
      <div className="bg-radial from-[#DDD788] to-[#A47251] min-h-screen relative">
        <div className="bg-[#E0CEA9] rounded-2xl p-10 text-center">
          <p className="font-bold text-xl mb-4">
            Selesaikan materi dulu sebelum mengerjakan kuis! 📚
          </p>
          <button
            onClick={() => navigate("/belajar")}
            className="bg-[#241919] text-white px-8 py-3 rounded-xl font-semibold"
          >
            Kembali ke Belajar
          </button>
        </div>
      </div>
    );

  if (showIntro)
    return (
      <div className="bg-radial from-[#DDD788] to-[#A47251] min-h-screen relative">
        <div className="max-w-3xl mx-auto px-6 py-10">
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => navigate("/belajar")}
              className="text-2xl cursor-pointer"
            >
              ←
            </button>
            <h1
              className="text-2xl font-bold"
              style={{ fontFamily: "'Jersey 20', cursive" }}
            >
              {quiz.title}
            </h1>
          </div>
          <div className="bg-[#E0CEA9] rounded-2xl p-8">
            <h2 className="font-bold text-lg mb-4">
              Selamat datang di {quiz.title}
            </h2>
            <p className="text-sm">
              Karena Kamu telah menyelesaikan materinya. Sekarang saatnya
              menguji pengetahuanmu mengenai materi yang telah dipelajari.
              Silakan kerjakan kuis ini dengan teliti. Untuk melanjutkan ke
              tahap berikutnya dan mendapatkan poin, kamu harus memperoleh skor
              minimal 70.
            </p>
          </div>
          <div className="flex justify-end mt-6">
            <button
              onClick={() => setShowIntro(false)}
              className="bg-[#241919] text-white px-8 py-3 rounded-xl font-semibold"
            >
              Mulai
            </button>
          </div>
        </div>
      </div>
    );

  if (showResult)
    return (
      <div className="bg-radial from-[#DDD788] to-[#A47251] min-h-screen relative">
        <div className="max-w-3xl mx-auto px-6 py-10">
          <h1
            className="text-2xl font-bold mb-6"
            style={{ fontFamily: "'Jersey 20', cursive" }}
          >
            {quiz.title}
          </h1>
          <div className="bg-[#E0CEA9] rounded-2xl p-8 text-center">
            <h2 className="font-bold text-xl mb-6">Total skor</h2>
            <div className="flex justify-center gap-16 mb-4">
              <div className="flex flex-col items-center">
                <span className="text-4xl">❌</span>
                <p>Salah</p>
                <p className="font-bold text-xl">{score.wrong}</p>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-4xl">✅</span>
                <p>Benar</p>
                <p className="font-bold text-xl">{score.correct}</p>
              </div>
            </div>
            <p className="font-bold mb-4">
              Total skor:{" "}
              {Math.round((score.correct / quiz.questions.length) * 100)}
            </p>
            {Math.round((score.correct / quiz.questions.length) * 100) >= 70 ? (
              <p className="text-green-700 font-semibold">
                Skor anda telah memenuhi syarat untuk lanjut ke bab berikutnya
              </p>
            ) : (
              <p className="text-red-600 font-semibold">
                Skor tidak memenuhi syarat, silahkan untuk mengulang kembali
                kuis minimal skor: 70
              </p>
            )}
          </div>
          <div className="flex justify-end mt-6">
            {Math.round((score.correct / quiz.questions.length) * 100) >= 70 ? (
              <button
                onClick={() => navigate("/")}
                className="bg-[#241919] text-white px-8 py-3 rounded-xl font-semibold"
              >
                Home
              </button>
            ) : (
              <button
                onClick={() => {
                  setCurrentQuestion(0);
                  setScore({ correct: 0, wrong: 0 });
                  setSelectedAnswer(null);
                  setIsAnswered(false);
                  setShowResult(false);
                }}
                className="bg-[#241919] text-white px-8 py-3 rounded-xl font-semibold"
              >
                Coba Lagi
              </button>
            )}
          </div>
        </div>
      </div>
    );

  return (
    <div className="bg-radial from-[#DDD788] to-[#A47251] min-h-screen relative">
      <div className="max-w-3xl mx-auto px-6 py-10">
        <h1
          className="text-2xl font-bold mb-6"
          style={{ fontFamily: "'Jersey 20', cursive" }}
        >
          {quiz.title}
        </h1>
        <div className="bg-[#E0CEA9] rounded-2xl p-8">
          <p className="text-center font-bold text-lg mb-6">
            {quiz.questions[currentQuestion].question}
          </p>
          <div className="flex flex-col gap-3">
            {quiz.questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className={`py-3 px-6 rounded-xl font-semibold transition
                ${
                  selectedAnswer === index
                    ? index === quiz.questions[currentQuestion].answer
                      ? "bg-green-400"
                      : "bg-red-400"
                    : "bg-[#B8A355] hover:brightness-95"
                }`}
              >
                {String.fromCharCode(65 + index)}. {option}
              </button>
            ))}
          </div>

          {isAnswered && (
            <div className="mt-6 p-4 rounded-xl bg-white text-center">
              {selectedAnswer === quiz.questions[currentQuestion].answer ? (
                <p className="text-green-600 font-bold">
                  ✅ Jawaban anda benar!
                </p>
              ) : (
                <p className="text-red-600 font-bold">
                  ❌ Mohon maaf jawaban anda salah, silahkan coba kembali
                </p>
              )}
            </div>
          )}
        </div>

        {isAnswered && (
          <div className="flex justify-end mt-6">
            <button
              onClick={handleNext}
              className="bg-[#241919] text-white px-8 py-3 rounded-xl font-semibold"
            >
              {currentQuestion < quiz.questions.length - 1
                ? "Selanjutnya"
                : "Lihat Hasil"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default QuizDetail;
