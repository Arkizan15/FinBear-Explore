import { executeQuery } from '../config/database.js'

export const getQuizById = async (req, res) => {
  try {
    const quizId = req.params.id
    const quizzes = await executeQuery(
      'SELECT q.*, m.title as module_title FROM quizzes q JOIN modules m ON q.moduleId = m.id WHERE q.id = ?',
      [quizId]
    )
    
    if (quizzes.length === 0) {
      return res.status(404).json({ error: 'Quiz not found' })
    }
    
    const quiz = quizzes[0]
    // Parse JSON questions from database
    quiz.questions = JSON.parse(quiz.questions || '[]')
    
    res.json(quiz)
  } catch (error) {
    console.error('Get quiz error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}