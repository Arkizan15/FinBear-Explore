# 🐻 FinBear - Financial Bear

> Platform literasi keuangan interaktif untuk remaja

![FinBear](https://img.shields.io/badge/FinBear-DBS%20Coding%20Camp%202026-blue)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js)

---

## 📖 Tentang FinBear

FinBear adalah platform literasi keuangan interaktif yang dirancang khusus untuk remaja. Dengan pendekatan gamifikasi menggunakan karakter beruang 3D, FinBear membantu remaja belajar mengelola keuangan dengan cara yang menyenangkan.

### ✨ Fitur Utama

- 🐻 **Virtual Bear** — Karakter beruang 3D yang tumbuh seiring poin bertambah (Bayi → Remaja → Dewasa)
- 📚 **Modul Belajar** — Materi keuangan interaktif dengan sistem slide
- 🎯 **Kuis** — Uji pemahaman dengan kuis pilihan ganda (minimal skor 70)
- 💰 **Pencatat Keuangan** — Catat pemasukan dan pengeluaran harian
- 🏆 **Sistem Poin** — Dapatkan poin dari materi dan kuis untuk menaikkan level beruang
- 🔐 **Autentikasi** — Register dan login dengan JWT

---

## 👥 Tim Pengembang

| Nama | Role |
|------|------|
| Charly Islami | Team Leader & Frontend Developer |
| Arkan Rifqy Fauzan | Backend Developer |
| Aliyah Salsabila | UI/UX Designer |
| Farell Adrian | Backend Developer |
| Dinda Ludovica Valentina Lawolo | Frontend Developer |

---

## 🛠️ Tech Stack

**Frontend:**
- React.js + Vite
- Tailwind CSS
- Three.js (3D Bear Model)
- React Router DOM

**Backend:**
- Node.js + Express
- JSON File Database
- JWT Authentication
- bcryptjs

---

## 📁 Struktur Folder

```
FinBear/
├── frontend/
│   ├── public/
│   │   ├── beruangkecil.glb
│   │   ├── beruangremaja.glb
│   │   ├── beruangdewasa.glb
│   │   ├── beruangfinance.png
│   │   ├── beruangnotregistered.png
│   │   ├── coin.png
│   │   └── logo.png
│   └── src/
│       ├── assets/
│       ├── components/
│       │   ├── BearModel.jsx
│       │   ├── Navbar.jsx
│       │   └── ScrollToTop.jsx
│       ├── context/
│       │   └── AuthContext.jsx
│       ├── pages/
│       │   ├── Home.jsx
│       │   ├── Learn.jsx
│       │   ├── MateriDetail.jsx
│       │   ├── QuizDetail.jsx
│       │   ├── Finance.jsx
│       │   ├── Profile.jsx
│       │   ├── Login.jsx
│       │   ├── Loading.jsx
│       │   └── NotRegistered.jsx
│       ├── config.js
│       ├── App.jsx
│       └── main.jsx
└── backend/
    ├── data/
    │   └── database.json
    └── src/
        ├── config/
        │   └── database.js
        ├── controllers/
        │   ├── authController.js
        │   ├── financeController.js
        │   ├── moduleController.js
        │   ├── quizController.js
        │   └── userController.js
        ├── middleware/
        │   └── authMiddleware.js
        └── routes/
            ├── authRoutes.js
            ├── financeRoutes.js
            ├── moduleRoutes.js
            ├── quizRoutes.js
            └── userRoutes.js
```

---

## 🚀 Cara Menjalankan

### Prerequisites
- Node.js v18+
- npm

### 1. Clone Repository
```bash
git clone https://github.com/CharlyIslami/FinBear.git
cd FinBear
```

### 2. Setup Backend
```bash
cd backend
npm install
npm run dev
```
Backend akan berjalan di `http://localhost:3000`

### 3. Setup Frontend
```bash
cd frontend
npm install
```

Buat file `.env` di dalam folder `frontend`:
```
VITE_API_URL=http://localhost:3000
```

Lalu jalankan:
```bash
npm run dev
```
Frontend akan berjalan di `http://localhost:5173`

---

## 🔑 Endpoint API

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| POST | /auth/signup | Register user baru |
| POST | /auth/login | Login user |
| GET | /modules | Ambil semua modul |
| GET | /modules/:id | Ambil modul berdasarkan id |
| GET | /kuis/:id | Ambil kuis berdasarkan id |
| POST | /user/points | Tambah poin user |
| GET | /user/progress/:userId/:moduleId | Cek progress user |
| GET | /finance | Ambil semua transaksi |
| POST | /finance | Tambah transaksi |
| DELETE | /finance/:id | Hapus transaksi |

---

## 🎮 Sistem Poin & Level Beruang

| Poin | Level |
|------|-------|
| 0 - 49 | 🐻 Beruang Bayi |
| 50 - 99 | 🐻 Beruang Remaja |
| 100+ | 🐻 Beruang Dewasa |

---

## 📝 Lisensi

Project ini dibuat untuk **DBS Coding Camp 2026** — Full Stack Web Developer Learning Path.

© 2026 Tim FinBear"# FinBear-Explore" 
