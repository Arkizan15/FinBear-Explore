import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API_URL from "../config";

function Finance() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showMain, setShowMain] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
  });

  // Cek login status
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Fetch transactions ketika showMain berubah
  useEffect(() => {
    if (showMain && user) {
      fetchTransactions();
    }
  }, [showMain, user]);

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/finance`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setTransactions(data.transactions);
      setSummary(data.summary);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const handleAddTransaction = async () => {
    if (!type || !amount || !category) {
      alert("Semua field wajib diisi!");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/finance`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          type,
          amount: Number(amount),
          category,
          description: "",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error);
        return;
      }

      setTransactions([...transactions, data.transaction]);
      setSummary((prev) => ({
        totalIncome:
          data.transaction.type === "income"
            ? prev.totalIncome + data.transaction.amount
            : prev.totalIncome,
        totalExpense:
          data.transaction.type === "expense"
            ? prev.totalExpense + data.transaction.amount
            : prev.totalExpense,
        balance:
          data.transaction.type === "income"
            ? prev.balance + data.transaction.amount
            : prev.balance - data.transaction.amount,
      }));
      setType("");
      setAmount("");
      setCategory("");
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  const handleDeleteTransaction = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/finance/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        alert("Gagal menghapus transaksi");
        return;
      }

      setTransactions(transactions.filter((t) => t.id !== id));
      const deleted = transactions.find((t) => t.id === id);
      setSummary((prev) => ({
        totalIncome:
          deleted.type === "income"
            ? prev.totalIncome - deleted.amount
            : prev.totalIncome,
        totalExpense:
          deleted.type === "expense"
            ? prev.totalExpense - deleted.amount
            : prev.totalExpense,
        balance:
          deleted.type === "income"
            ? prev.balance - deleted.amount
            : prev.balance + deleted.amount,
      }));
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  if (!showMain)
    return (
      <div className="bg-radial from-[#DDD788] to-[#A47251] min-h-screen relative flex items-center justify-center">
        <div className="bg-[#E0CEA9] rounded-2xl p-10 max-w-lg w-full mx-6 flex flex-col items-center gap-6">
          <div className="flex items-center gap-6">
            <img
              src="/beruangfinance.png"
              className="w-40 h-40 object-contain"
            />
            <p className="text-sm font-medium">
              Kelola keuanganmu dengan mudah! Catat setiap pemasukan dan
              pengeluaran agar kamu bisa memantau dan mengontrol penggunaan
              uangmu dengan lebih baik.
            </p>
          </div>
          <button
            onClick={() => setShowMain(true)}
            className="bg-[#241919] text-white px-10 py-3 rounded-xl cursor-pointer tracking-wide"
            style={{ fontFamily: "'Jersey 20', cursive" }}
          >
            Mulai
          </button>
        </div>
      </div>
    );

  return (
    <div className="bg-radial from-[#DDD788] to-[#A47251] min-h-screen relative">
      <div className="max-w-3xl mx-auto">
        {/* Form Transaksi */}
        <div className="bg-[#E0CEA9] rounded-2xl p-8 mb-6">
          <div className="flex gap-6">
            <div className="flex flex-col gap-2 w-1/2">
              <label className="font-semibold">jenis</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="bg-[#241919] text-white px-4 py-3 rounded-xl"
              >
                <option value="">Pilih jenis</option>
                <option value="income">Pemasukan</option>
                <option value="expense">Pengeluaran</option>
              </select>
            </div>
            <div className="flex flex-col gap-2 w-1/2">
              <label className="font-semibold">jumlah (RP)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Hanya berupa angka"
                className="bg-[#241919] text-white px-4 py-3 rounded-xl"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <label className="font-semibold">Kategori :</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="contoh: makanan, gaji, uang jajan"
              className="bg-[#241919] text-white px-4 py-3 rounded-xl"
            />
          </div>
        </div>

        {/* Summary */}
        <div className="flex gap-4 mb-6">
          <div className="bg-[#E0CEA9] rounded-2xl p-6 flex-1 text-center">
            <p className="font-semibold text-sm mb-1">Total Pemasukan</p>
            <p className="font-bold text-lg text-green-700">
              Rp {summary.totalIncome.toLocaleString("id-ID")}
            </p>
          </div>
          <div className="bg-[#E0CEA9] rounded-2xl p-6 flex-1 text-center">
            <p className="font-semibold text-sm mb-1">Total Pengeluaran</p>
            <p className="font-bold text-lg text-red-700">
              Rp {summary.totalExpense.toLocaleString("id-ID")}
            </p>
          </div>
          <div className="bg-[#E0CEA9] rounded-2xl p-6 flex-1 text-center">
            <p className="font-semibold text-sm mb-1">Saldo</p>
            <p className="font-bold text-lg">
              Rp {summary.balance.toLocaleString("id-ID")}
            </p>
          </div>
        </div>

        {/* Riwayat Transaksi */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-lg">Riwayat Transaksi</h2>
            <button
              className="bg-[#B8A355] px-6 py-2 rounded-xl font-semibold"
              onClick={handleAddTransaction}
            >
              + TAMBAH TRANSAKSI
            </button>
            <span className="font-semibold">
              {transactions.length} transaksi
            </span>
          </div>

          {transactions.length === 0 ? (
            <p className="text-center italic mt-6">
              Belum ada transaksi. Mulai catat keuanganmu! 🐻
            </p>
          ) : (
            <div className="flex flex-col gap-3">
              {transactions.map((t) => (
                <div
                  key={t.id}
                  className="bg-[#B8A355] rounded-xl px-6 py-4 flex justify-between items-center"
                >
                  <div>
                    <p>
                      jenis :{" "}
                      {t.type === "income" ? "pemasukan" : "pengeluaran"}
                    </p>
                    <p>kebutuhan : {t.category}</p>
                    <p className="font-bold">
                      jumlah (RP) : {t.amount.toLocaleString("id-ID")}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteTransaction(t.id)}
                    className="text-red-700 font-bold text-lg cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Finance;
