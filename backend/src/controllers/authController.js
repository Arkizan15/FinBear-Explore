import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { executeQuery } from '../config/database.js'

export const signup = async (req, res) => {
  try {
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' })
    }

    // Check if user exists
    const existingUser = await executeQuery(
      'SELECT id FROM users WHERE username = ?',
      [username]
    )
    
    if (existingUser.length > 0) {
      return res.status(400).json({ error: 'Username already taken' })
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Generate ID
    const userId = Date.now().toString()

    // Create user
    await executeQuery(
      'INSERT INTO users (id, username, password, points) VALUES (?, ?, ?, ?)',
      [userId, username, hashedPassword, 0]
    )

    // Generate JWT for automatic login after signup
    const secret = process.env.JWT_SECRET || 'your_super_secret_jwt_key'
    const token = jwt.sign(
      { id: userId, username: username },
      secret,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    )

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: { id: userId, username, points: 0 }
    })
  } catch (error) {
    console.error('Signup error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const login = async (req, res) => {
  try {
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' })
    }

    // Find user
    const users = await executeQuery(
      'SELECT id, username, password, points FROM users WHERE username = ?',
      [username]
    )
    
    if (users.length === 0) {
      return res.status(401).json({ error: 'Invalid username or password' })
    }
    
    const user = users[0]

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid username or password' })
    }

    // Generate JWT
    const secret = process.env.JWT_SECRET || 'your_super_secret_jwt_key'
    const token = jwt.sign(
      { id: user.id, username: user.username },
      secret,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    )

    res.json({
      message: 'Login successful',
      token,
      user: { id: user.id, username: user.username, points: user.points }
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
