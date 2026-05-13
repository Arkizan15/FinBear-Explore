-- Database FinBear untuk Laragon MySQL
-- Updated: May 2026 - Sesuai dengan struktur data JSON

-- Create database
CREATE DATABASE IF NOT EXISTS finbear_db;
USE finbear_db;

-- Users table (sesuai JSON: id, username, password, points, createdAt)
CREATE TABLE users (
    id VARCHAR(50) PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    points INT DEFAULT 0,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Modules table (sesuai JSON: id, title, description, points, slides)
CREATE TABLE modules (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    points INT DEFAULT 0,
    slides JSON
);

-- Quizzes table (sesuai JSON: id, moduleId, title, points, questions)
CREATE TABLE quizzes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    moduleId INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    points INT DEFAULT 0,
    questions JSON,
    FOREIGN KEY (moduleId) REFERENCES modules(id) ON DELETE CASCADE
);

-- User progress table (sesuai JSON: userId, moduleId, claimedAt)
CREATE TABLE user_progress (
    userId VARCHAR(50) NOT NULL,
    moduleId VARCHAR(50) NOT NULL,
    claimedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (userId, moduleId),
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

-- Achievements table (sesuai JSON: kosong)
CREATE TABLE achievements (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100),
    description TEXT,
    icon VARCHAR(50),
    points INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User achievements table (sesuai JSON: kosong)
CREATE TABLE user_achievements (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId VARCHAR(50) NOT NULL,
    achievementId INT NOT NULL,
    earnedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (achievementId) REFERENCES achievements(id) ON DELETE CASCADE
);

-- Transactions table (sesuai JSON: id, userId, type, amount, category, description, createdAt)
CREATE TABLE transactions (
    id VARCHAR(50) PRIMARY KEY,
    userId VARCHAR(50) NOT NULL,
    type ENUM('income', 'expense') NOT NULL,
    amount DECIMAL(15,2) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

-- Insert data dari JSON
INSERT INTO users (id, username, password, points, createdAt) VALUES
('1775197962382', 'popo', '$2b$10$m7N88V15/6TxR28z7GshQ.P5X6N2Hia51IShGxKuUcIHSo3ZE7LA6', 0, '2026-04-03 06:32:42'),
('1775274748255', 'user', '$2b$10$k9nh7HAJ05MvnGn9.SDj9.RFjSqLcsZe9tCHjiqWRFH6qGRb2pR9C', 105, '2026-04-04 03:52:28'),
('1775357664854', 'loremipsum', '$2b$10$lYYBu2Wpablr2CaQXkw7FuZQxPxcTt6wULbea7fID1CLNvDOtbyju', 85, '2026-04-05 02:54:24'),
('1775658429506', 'aldis burger', '$2b$10$udl7pWCrSUwuDaVo2hJsOexRffCvktWgC.GVWH/EN1iEwESOXjHOC', 85, '2026-04-08 14:27:09'),
('1775910867696', 'charly burger', '$2b$10$g2miAr5Jx0Y3WRBk5.wm9eXJZpWCI68//QAPK3XQ4KraFBzmSRLM6', 100, '2026-04-11 12:34:27'),
('1775922490441', 'bakso', '$2b$10$E6L4JyDmyHaZV.X0t8j3KulBF5fyp.lbw30rQQC4QJNDRoActJIBm', 100, '2026-04-11 15:48:10'),
('1775964639840', 'rusdi', '$2b$10$y7tqn0OD05KiBUzbEbHNvegnLlRi8z6haUmSupXULZuWOgDSmVPD.', 35, '2026-04-12 03:30:39'),
('1775965865858', 'ilham', '$2b$10$7i5nOtI9Qu79Chp3wOstn.hZlEGdety.TyH2K6uXQp91Gz.8NhelW', 85, '2026-04-12 03:51:05'),
('1777269160894', 'arkan', '$2b$10$71BtpMcqa1XxhF1wYzzdtOck0FQjRloArt4ezC.8RhXoLVLmV5e4i', 35, '2026-04-27 05:52:40');

INSERT INTO modules (id, title, description, points, slides) VALUES
(1, 'Dasar-dasar keuangan', 'Penghasilan, tabungan, dan investasi', 35, JSON_ARRAY(
    JSON_OBJECT('slidenumber', 1, 'title', 'Selamat datang di Bab 1: Penghasilan, Tabungan, dan Investasi 💡', 'content', 'Pada bab ini, kamu akan mempelajari dasar penting dalam keuangan,\n yaitu bagaimana mendapatkan penghasilan, menyimpan uang melalui tabungan, \n dan mengembangkannya lewat investasi.Ketiga hal ini merupakan langkah awal untuk \n mengelola keuangan dengan lebih bijak dan terarah.Dengan memahaminya, kamu bisa mulai \n membangun kebiasaan finansial yang baik sejak dini. Materi disusun secara sederhana agar mudah \n dipahami,jadi kamu bisa belajar dengan santai. \n tetap semangat ya dalam belajar dan jangan lupa menyimak setiap bagian dengan baik! \n Di sesi berikutnya akan ada kuis seru yang bisa kamu ikuti untuk mendapatkan poin \n dan meningkatkan level beruangmu 🐻✨ \n\nYuk mulai dan pelajari dasar keuanganmu sekarang!'),
    JSON_OBJECT('slidenumber', 2, 'title', '💰 Materi: Penghasilan (Income)', 'content', '📌 1. Pengertian Penghasilan\n Penghasilan adalah uang atau nilai yang diperoleh seseorang\n dari suatu aktivitas dalam periode tertentu. seperti (harian, mingguan, atau bulanan). \n 👉 Contoh: \n • Gaji dari kerja \n • Uang jajan dari orang tua \n • Keuntungan jualan'),
    JSON_OBJECT('slidenumber', 3, 'title', '📊 2. Jenis-Jenis Penghasilan', 'content', '1. Active Income (Penghasilan Aktif) \n Penghasilan yang didapat dari bekerja langsung. \n ✅ Contoh: \n • Gaji karyawan \n • Upah harian \n • Fee freelance \n 📌 Ciri: \n • Harus kerja dulu baru dapat uang \n • Kalau berhenti kerja → penghasilan berhenti'),
    JSON_OBJECT('slidenumber', 4, 'title', 'Passive Income', 'content', '2. Passive Income (Penghasilan Pasif) \n Penghasilan yang tetap masuk tanpa \n harus bekerja terus-menerus. \n ✅ Contoh: \n • Sewa rumah \n • Dividen saham \n • Bisnis yang sudah berjalan otomatis \n 📌 Ciri: \n • Tidak perlu kerja setiap waktu \n • Bisa tetap dapat uang walau lagi istirahat'),
    JSON_OBJECT('slidenumber', 5, 'title', 'Portfolio Income', 'content', '3. Portfolio Income \n Penghasilan dari investasi atau aset keuangan \n ✅ Contoh: \n • Keuntungan saham \n • obligasi \n • Reksa dana'),
    JSON_OBJECT('slidenumber', 6, 'title', 'Tabungan', 'content', 'Tabungan adalah simpanan uang yang berasal dari pendapatan yang disisihkan, \n bertujuan untuk kebutuhan masa depan, dana darurat, \n atau tujuan keuangan tertentu, dan umumnya dapat diambil sewaktu-waktu.'),
    JSON_OBJECT('slidenumber', 7, 'title', 'Manfaat Tabungan', 'content', '• Tabungan memberikan perlindungan finansial dalam situasi darurat. \n • Membantu merencanakan masa depan dengan lebih baik \n • Memberikan rasa aman dan terhindar dari kecemasan tentang uang.'),
    JSON_OBJECT('slidenumber', 8, 'title', 'Investasi', 'content', 'Investasi adalah kegiatan menanamkan modal atau aset ke dalam suatu instrumen dengan harapan mendapatkan keuntungan di masa depan. Tujuan utama dari investasi adalah untuk mendapatkan keuntungan (return) dari dana yang diinvestasikan, baik dalam bentuk bunga, dividen, maupun apresiasi nilai aset.'),
    JSON_OBJECT('slidenumber', 9, 'title', 'Manfaat Utama Investasi', 'content', '• Melawan Inflasi \n • Meningkatkan Nilai Kekayaan \n • Menciptakan Pendapatan Pasif \n • Mempersiapkan Masa Depan \n '),
    JSON_OBJECT('slidenumber', 10, 'title', 'Jenis-jenis Investasi', 'content', '• Investasi Emas \n Contoh: emas batangan, logam mulia \n Ciri: relatif aman dan stabil \n\n • Investasi Properti \n Contoh: rumah, tanah, kos-kosan \n Ciri: nilai cenderung naik setiap tahun \n\n • Investasi Saham \n Membeli kepemilikan perusahaan \n Keuntungan dari kenaikan harga & dividen'),
    JSON_OBJECT('slidenumber', 11, 'title', 'Jenis-jenis Investasi', 'content', '• Investasi Reksa Dana \n Dana dikelola oleh manajer investasi \n Cocok untuk pemula \n\n • Investasi Deposito\n Menyimpan uang di bank dalam jangka waktu tertentu \n Bunga tetap, risiko rendah \n\n • Investasi Obligasi \n Surat utang dari pemerintah/perusahaan \n Dapat bunga (kupon) secara berkala')
)),
(2, 'Anggaran Bulanan', 'Cara membuat dan memantau anggaran', 35, JSON_ARRAY(
    JSON_OBJECT('slidenumber', 1, 'title', 'Selamat datang di Bab 2: Anggaran Bulanan 📒', 'content', 'Di bab ini, kamu akan belajar cara membuat dan memantau anggaran bulanan.\nAnggaran adalah rencana keuangan yang membantu kamu mengatur pemasukan dan pengeluaran.\nDengan memahami anggaran, kamu bisa lebih bijak dalam mengelola uang.\n\nYuk mulai belajar!'),
    JSON_OBJECT('slidenumber', 2, 'title', '💰 Apa itu Anggaran?', 'content', 'Anggaran adalah rencana penggunaan uang dalam periode tertentu.\n📌 Fungsi anggaran:\n• Mengontrol pengeluaran\n• Menghindari pemborosan\n• Membantu mencapai tujuan keuangan'),
    JSON_OBJECT('slidenumber', 3, 'title', '📊 Jenis-Jenis Anggaran', 'content', '1. Anggaran Kebutuhan Pokok\n• Makanan\n• Transportasi\n• Pendidikan\n\n2. Anggaran Keinginan\n• Hiburan\n• Belanja\n• Jajan\n\n3. Anggaran Tabungan\n• Dana darurat\n• Investasi'),
    JSON_OBJECT('slidenumber', 4, 'title', '📝 Cara Membuat Anggaran', 'content', '1. Catat semua pemasukan\n2. Buat daftar pengeluaran rutin\n3. Pisahkan kebutuhan dan keinginan\n4. Sisihkan untuk tabungan dulu\n5. Pantau pengeluaran setiap hari'),
    JSON_OBJECT('slidenumber', 5, 'title', '💡 Tips Mengelola Anggaran', 'content', '✅ Pakai aturan 50/30/20:\n• 50% untuk kebutuhan pokok\n• 30% untuk keinginan\n• 20% untuk tabungan\n\n📌 Contoh:\nUang jajan Rp 500.000\n• Kebutuhan: Rp 250.000\n• Keinginan: Rp 150.000\n• Tabungan: Rp 100.000')
));

INSERT INTO quizzes (id, moduleId, title, points, questions) VALUES
(1, 1, 'Kuis Dasar-dasar keuangan', 15, JSON_ARRAY(
    JSON_OBJECT('id', 1, 'question', 'Apa yang dimaksud dengan penghasilan?', 'options', JSON_ARRAY('Uang yang dikeluarkan untuk belanja', 'Uang yang diperoleh dari suatu aktivitas', 'Uang yang disimpan di bank', 'Uang yang dipinjam'), 'answer', 1),
    JSON_OBJECT('id', 2, 'question', 'Contoh dari active income adalah...', 'options', JSON_ARRAY('Dividen saham', 'Sewa rumah', 'Gaji karyawan', 'Keuntungan reksa dana'), 'answer', 2),
    JSON_OBJECT('id', 3, 'question', 'Apa tujuan utama dari menabung?', 'options', JSON_ARRAY('Untuk membeli barang mewah', 'Untuk kebutuhan masa depan dan dana darurat', 'Untuk dipinjamkan ke orang lain', 'Untuk membayar hutang'), 'answer', 1),
    JSON_OBJECT('id', 4, 'question', 'Yang termasuk passive income adalah...', 'options', JSON_ARRAY('Gaji bulanan', 'Upah harian', 'Fee freelance', 'Dividen saham'), 'answer', 3),
    JSON_OBJECT('id', 5, 'question', 'Contoh dari portfolio income adalah...', 'options', JSON_ARRAY('Uang jajan', 'Gaji kerja', 'Keuntungan saham', 'Sewa kos'), 'answer', 2)
)),
(2, 2, 'Kuis Anggaran Bulanan', 15, JSON_ARRAY(
    JSON_OBJECT('id', 1, 'question', 'Apa yang dimaksud dengan anggaran?', 'options', JSON_ARRAY('Uang yang dipinjam', 'Rencana penggunaan uang dalam periode tertentu', 'Uang yang dihabiskan', 'Uang yang disimpan di bank'), 'answer', 1),
    JSON_OBJECT('id', 2, 'question', 'Berapa persen untuk kebutuhan pokok dalam aturan 50/30/20?', 'options', JSON_ARRAY('20%', '30%', '50%', '70%'), 'answer', 2),
    JSON_OBJECT('id', 3, 'question', 'Apa fungsi utama dari anggaran?', 'options', JSON_ARRAY('Untuk meminjam uang', 'Untuk mengontrol pengeluaran', 'Untuk membeli barang mewah', 'Untuk menghindari menabung'), 'answer', 1),
    JSON_OBJECT('id', 4, 'question', 'Dalam aturan 50/30/20, berapa persen untuk tabungan?', 'options', JSON_ARRAY('50%', '30%', '10%', '20%'), 'answer', 3),
    JSON_OBJECT('id', 5, 'question', 'Langkah pertama dalam membuat anggaran adalah...', 'options', JSON_ARRAY('Belanja kebutuhan', 'Catat semua pemasukan', 'Sisihkan tabungan', 'Buat daftar keinginan'), 'answer', 1)
));

INSERT INTO user_progress (userId, moduleId, claimedAt) VALUES
('1775357664854', '1', '2026-04-11 03:52:02'),
('1775658429506', '1', '2026-04-11 03:54:37'),
('1775910867696', '1', '2026-04-11 12:48:48'),
('1775357664854', 'quiz_1', '2026-04-11 13:37:54'),
('1775910867696', 'quiz_1', '2026-04-11 15:36:54'),
('1775910867696', '2', '2026-04-11 15:37:18'),
('1775910867696', 'quiz_2', '2026-04-11 15:37:43'),
('1775658429506', 'quiz_1', '2026-04-11 15:46:34'),
('1775658429506', '2', '2026-04-11 15:46:41'),
('1775922490441', '1', '2026-04-11 15:48:44'),
('1775922490441', 'quiz_1', '2026-04-11 15:49:07'),
('1775922490441', '2', '2026-04-11 15:49:22'),
('1775922490441', 'quiz_2', '2026-04-11 15:53:27'),
('1775926376335', '1', '2026-04-11 17:01:55'),
('1775926376335', '2', '2026-04-11 17:02:03'),
('1775926376335', 'quiz_1', '2026-04-11 17:02:12'),
('1775926376335', 'quiz_2', '2026-04-11 17:02:29'),
('1775964639840', '1', '2026-04-12 03:40:21'),
('1775357664854', '2', '2026-04-12 03:40:42'),
('1775965865858', '1', '2026-04-12 03:59:53'),
('1775965865858', '2', '2026-04-12 04:00:07'),
('1775965865858', 'quiz_1', '2026-04-12 04:00:07'),
('1777269160894', '1', '2026-04-27 05:58:54');

INSERT INTO transactions (id, userId, type, amount, category, description, createdAt) VALUES
('1775279601423', '1775274748255', 'income', 35000, 'uang jajan', 'uang jajan sekolah', '2026-04-04 05:13:21'),
('1775889283900', '1775658429506', 'income', 10000, 'jajan harian', '', '2026-04-11 06:34:43'),
('1775966360571', '1775965865858', 'income', 1000000, 'gaji ', '', '2026-04-12 03:59:20'),
('1775966369507', '1775965865858', 'expense', 10000, 'nasi bungkus', '', '2026-04-12 03:59:29'),
('1777269177431', '1777269160894', 'income', 1000000000, 'makan', '', '2026-04-27 05:52:57'),
('1777269398936', '1777269160894', 'expense', 500000, 'kopi makanan rokok', '', '2026-04-27 05:56:38'),
('1777269485146', '1777269160894', 'income', 100000000, 'gaji Januari', '', '2026-04-27 05:58:05');

-- Create indexes for better performance
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_modules_title ON modules(title);
CREATE idx_user_progress_user ON user_progress(userId);
CREATE idx_user_progress_module ON user_progress(moduleId);
CREATE INDEX idx_transactions_user ON transactions(userId);
CREATE INDEX idx_transactions_type ON transactions(type);
