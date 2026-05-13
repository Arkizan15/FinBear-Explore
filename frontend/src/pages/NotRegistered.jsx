import { useNavigate } from "react-router-dom";

function NotRegistred() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#4A5568] flex items-center justify-center">
      <div className="bg-[#5A6478] rounded-3xl p-16 max-w-2xl w-full mx-6 flex flex-col items-center">
        <div className="flex items-center gap-10 mb-10">
          <img src="/beruangnotregistered.png" className="w-48 h-48 object-contain" />
          <p className="text-white text-xl font-semibold max-w-xs" style={{ fontFamily: "'Jersey 20', cursive" }}>
            Oops! Kamu belum terdaftar. Yuk, buat akun dulu dengan klik "Sign Up", setelah itu baru bisa Sign In
          </p>
        </div>
        <button
          onClick={() => navigate('/login')}
          className="bg-[#9BA8C0] text-white px-16 py-3 rounded-2xl text-lg font-semibold hover:brightness-95 transition"
          style={{ fontFamily: "'Jersey 20', cursive" }}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default NotRegistred;