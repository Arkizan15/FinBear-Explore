import express from 'express'
import { getAllModules, getModuleById } from '../controllers/moduleController.js'

const router = express.Router()

router.get('/', getAllModules)
router.get('/:id', getModuleById)

export default router