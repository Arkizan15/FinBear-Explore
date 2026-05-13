import { executeQuery } from '../config/database.js'

export const addTransaction = async (req, res) => {
  try {
    const { type, amount, category, description } = req.body
    const userId = req.user.id

    if (!type || !amount || !category) {
      return res.status(400).json({ error: 'Type, amount, dan category wajib diisi' })
    }

    if (type !== 'income' && type !== 'expense') {
      return res.status(400).json({ error: 'Type harus income atau expense' })
    }

    // Generate ID
    const transactionId = Date.now().toString()

    await executeQuery(
      'INSERT INTO transactions (id, userId, type, amount, category, description) VALUES (?, ?, ?, ?, ?, ?)',
      [transactionId, userId, type, Number(amount), category, description || null]
    )

    const newTransaction = await executeQuery(
      'SELECT * FROM transactions WHERE id = ?',
      [transactionId]
    )

    res.status(201).json({
      message: 'Transaksi berhasil ditambahkan',
      transaction: newTransaction[0]
    })
  } catch (error) {
    console.error('Add transaction error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}


export const getTransactions = async (req, res) => {
  try {
    const userId = req.user.id

    const transactions = await executeQuery(
      'SELECT * FROM transactions WHERE userId = ? ORDER BY createdAt DESC',
      [userId]
    )

    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + parseFloat(t.amount), 0)

    const totalExpense = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + parseFloat(t.amount), 0)

    res.json({
      transactions,
      summary: {
        totalIncome,
        totalExpense,
        balance: totalIncome - totalExpense
      }
    })
  } catch (error) {
    console.error('Get transactions error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}


export const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params
    const userId = req.user.id

    const transaction = await executeQuery(
      'SELECT * FROM transactions WHERE id = ? AND userId = ?',
      [id, userId]
    )

    if (transaction.length === 0) {
      return res.status(404).json({ error: 'Transaksi tidak ditemukan' })
    }

    await executeQuery(
      'DELETE FROM transactions WHERE id = ? AND userId = ?',
      [id, userId]
    )

    res.json({ message: 'Transaksi berhasil dihapus' })
  } catch (error) {
    console.error('Delete transaction error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}