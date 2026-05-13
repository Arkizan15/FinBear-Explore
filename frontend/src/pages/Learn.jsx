import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const modules = [
  {
    id: 1,
    title: "Dasar-dasar Keuangan",
    description: "Penghasilan, tabungan dan investasi",
    points: 35,
    type: "materi",
  },
  {
    id: 1,
    title: "Kuis Dasar-dasar Keuangan",
    points: 15,
    type: "Kuis",
  },
  {
    id: 2,
    title: "Anggaran Bulanan",
    description: "Cara membuat dan memantau anggaran",
    points: 35,
    type: "materi",
  },
  {
    id: 2,
    title: "Kuis Anggaran Bulanan",
    points: 15,
    type: "kuis",
  },
];

function Learn() {
  const navigate = useNavigate();
  const savedImage = localStorage.getItem("profileImage");

  return (
    <div className="bg-radial from-[#DDD788] to-[#A47251] min-h-screen relative">
      <div className="flex flex-col items-center justify-center py-20">
        <div className="flex flex-col gap-4">
          <h1
            className="tracking-wide text-5xl font-bold ml-10"
            style={{ fontFamily: "'Jersey 20', cursive" }}
          >
            Belajar Keuangan
          </h1>
          <p
            className="text-lg max-w-md ml-12"
            style={{ fontFamily: "'Jersey 20', cursive" }}
          >
            Kuasai ilmu finansial langkah demi langkah 🐻
          </p>
        </div>
        <div className="px-10 pb-20 flex flex-col gap-4 max-w-3xl mx-auto mt-10">
          {modules.map((module) => (
            <div
              key={module.id}
              onClick={() => navigate(`/belajar/${module.type}/${module.id}`)}
              className="bg-[#E0CEA9] rounded-2xl px-6 py-5 flex items-center justify-between cursor-pointer hover:brightness-95 transition ml-10"
            >
              <div className="flex flex-col gap-1">
                <h2
                  className="font-semibold text-lg"
                  style={{ fontFamily: "'Jersey 20', cursive" }}
                >
                  {module.title}
                </h2>
                {module.description && (
                  <p className="text-sm">{module.description}</p>
                )}
              </div>
              <span
                className="text-[#C17A2A] font-bold text-lg ml-10"
                style={{ fontFamily: "'Jersey 20', cursive" }}
              >
                +{module.points}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="fixed bottom-0 left-0 p-4 z-40">
       <button
          onClick={() => navigate("/profile")}
          className="flex items-center gap-15 bg-[#E0CEA9] px-4 py-2 rounded-lg cursor-pointer w-60"
        >
          {savedImage ? (
            <img
              src={savedImage}
              className="w-13 h-13 rounded-full object-cover"
            />
          ) : (
            <FaUserCircle className="text-gray-600" size={32} />
          )}
          <span className="font-semibold cursor-pointer   ">Profil</span>
        </button>
      </div>
    </div>
  );
}

export default Learn;
