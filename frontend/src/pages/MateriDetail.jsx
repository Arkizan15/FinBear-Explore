import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API_URL from "../config";

function MateriDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [module, setModule] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useAuth();
  const [alreadyClaimed, setAlreadyClaimed] = useState(false);

  useEffect(() => {
    const fetchModule = async () => {
      try {
        const response = await fetch(`${API_URL}/modules/${id}`);
        const data = await response.json();
        setModule(data);
        setCurrentSlide(0);
      } catch (error) {     
        console.error("Error fetching module", error);
      } finally {
        setLoading(false);
      }
    };

    fetchModule();
  }, [id]);

  if (loading) return <div>Loading ...</div>;
  if (!module) return <div>Modul tidak ditemukan</div>;
  const isLastSlide = currentSlide === module.slides.length;
  const handleClaimPoints = async () => {
    try {
      const response = await fetch(`${API_URL}/user/points`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          points: module.points,
          moduleId: module.id,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        setAlreadyClaimed(true);
        return;
      }

      setUser({ ...user, points: data.points });
      navigate("/belajar");
    } catch (error) {
      console.error("Error claiming points:", error);
    }
  };
  if (isLastSlide)
    return (
      <div className="bg-radial from-[#DDD788] to-[#A47251] min-h-screen relative">
        <div className="max-w-3xl mx-auto px-20 py-10">
          <h2
            className="text-2xl font-bold mb-6"
            style={{ fontFamily: "'Jersey 20', cursive" }}
          >
            {module.title}
          </h2>
          <div className="bg-[#E0CEA9] rounded-2xl p-8">
            <h3
              className="text-center font-bold text-xl mb-6"
              style={{ fontFamily: "'Jersey 20', cursive" }}
            >
              SELAMAT 🎉
            </h3>
            <p>
              Anda mendapatkan poin karena sudah menyelesaikan materi pada bab
              ini. Silahkan ambil poin dan melanjutkan ke materi selanjutnya
            </p>
          </div>
          <div className="flex justify-end mt-6">
            <div className="flex flex-col items-end gap-2 mt-6">
              {alreadyClaimed && (
                <div>
                  <p className="text-red-600 font-semibold mr-5">
                    Kamu sudah mengambil poin untuk materi ini
                  </p>
                  <p>
                    Kembali ke halaman belajar untuk mendapatkan poin lebih
                    banyak lagi
                  </p>
                </div>
              )}
            </div>
            <button
              onClick={() =>
                !user ? navigate("/notregistered") : handleClaimPoints()
              }
              className="bg-[#241919] text-white px-8 py-3 rounded-xl font-semibold"
            >
              Ambil Poin
            </button>
          </div>
        </div>
      </div>
    );

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
            {module.title}
          </h1>
        </div>

        <div className="bg-[#E0CEA9] rounded-2xl p-8">
          <h2 className="text-xl font-bold mb-4">
            {module.slides[currentSlide].title}
          </h2>
          <p className="whitespace-pre-line">
            {module.slides[currentSlide].content}
          </p>
        </div>
        <div className="flex justify-between mt-6">
          {currentSlide > 0 && (
            <button
              onClick={() => setCurrentSlide(currentSlide - 1)}
              className="bg-[#241919] text-white px-8 py-3 rounded-xl font-semibold"
            >
              Sebelumnya
            </button>
          )}
          <div className="ml-auto">
            <button
              onClick={() => setCurrentSlide(currentSlide + 1)}
              className="bg-[#241919] text-white px-8 py-3 rounded-xl font-semibold"
            >
              {currentSlide === 0 ? "Mulai" : "Selanjutnya"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MateriDetail;
