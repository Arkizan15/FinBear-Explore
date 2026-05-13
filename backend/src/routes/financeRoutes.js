import express from 'express'
import { addTransaction, getTransactions, deleteTransaction } from '../controllers/financeController.js'
import { verifyToken } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', verifyToken, addTransaction)
router.get('/', verifyToken, getTransactions)
router.delete('/:id', verifyToken, deleteTransaction)

export default router