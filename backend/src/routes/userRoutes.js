import express from 'express'
import { addPoints } from '../controllers/userController.js'
import { checkProgress } from '../controllers/userController.js'

const router = express.Router()

router.post('/points', addPoints)
router.get('/progress/:userId/:moduleId', checkProgress)

export default router