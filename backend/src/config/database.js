import mysql from 'mysql2/promise'

// Database connection configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'finbear_db',
  charset: 'utf8mb4'
}

let connection = null

/**
 * Initialize MySQL database connection
 */
export const initDB = async () => {
  try {
    connection = await mysql.createConnection(dbConfig)
    console.log('✅ Connected to MySQL database:', dbConfig.database)
    
    // Test connection
    await connection.execute('SELECT 1')
    console.log('✅ Database connection test successful')
    
    return connection
  } catch (error) {
    console.error('❌ Failed to connect to MySQL database:', error.message)
    throw error
  }
}

/**
 * Get database connection
 */
export const getConnection = () => {
  if (!connection) {
    throw new Error('Database not initialized. Call initDB() first.')
  }
  return connection
}

/**
 * Execute SQL query
 */
export const executeQuery = async (query, params = []) => {
  try {
    const conn = getConnection()
    const [rows] = await conn.execute(query, params)
    return rows
  } catch (error) {
    console.error('❌ Query execution failed:', error.message)
    throw error
  }
}

/**
 * Close database connection
 */
export const closeDB = async () => {
  if (connection) {
    await connection.end()
    connection = null
    console.log('✅ Database connection closed')
  }
}

/**
 * Database transaction helper
 */
export const transaction = async (callback) => {
  try {
    const conn = getConnection()
    await conn.beginTransaction()
    
    const result = await callback(conn)
    
    await conn.commit()
    return result
  } catch (error) {
    const conn = getConnection()
    await conn.rollback()
    throw error
  }
}
