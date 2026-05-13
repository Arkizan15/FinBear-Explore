import { executeQuery } from '../config/database.js'

export const addPoints = async (req, res) => {
  try {
    const { points, moduleId } = req.body
    const userId = req.user.id

    // Cek apakah user sudah claim poin untuk modul ini
    const existingProgress = await executeQuery(
      'SELECT userId FROM user_progress WHERE userId = ? AND moduleId = ?',
      [userId, moduleId]
    )

    if (existingProgress.length > 0) {
      return res.status(400).json({ error: 'Points already claimed for this module' })
    }

    // Cek user exists
    const users = await executeQuery('SELECT id FROM users WHERE id = ?', [userId])
    if (users.length === 0) {
      return res.status(404).json({ error: 'User not found' })
    }

    // Update progress ke completed
    await executeQuery(
      'INSERT INTO user_progress (userId, moduleId, claimedAt) VALUES (?, ?, NOW())',
      [userId, moduleId]
    )

    res.json({ 
      message: 'Module completed successfully',
      points: points
    })
  } catch (error) {
    console.error('Add points error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const checkProgress = async (req, res) => {
  try {
    const { moduleId } = req.params
    const userId = req.user.id

    const progress = await executeQuery(
      'SELECT claimedAt FROM user_progress WHERE userId = ? AND moduleId = ?',
      [userId, moduleId]
    )

    if (progress.length === 0) {
      return res.json({ completed: false, claimedAt: null })
    }

    res.json({ 
      completed: true,
      claimedAt: progress[0].claimedAt
    })
  } catch (error) {
    console.error('Check progress error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}