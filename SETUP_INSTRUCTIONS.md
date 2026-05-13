# Setup Instructions FinBear Project

## Database Setup (Laragon MySQL)

1. **Start Laragon** - Make sure Apache and MySQL are running
2. **Create Database** - Run the SQL script:
   ```bash
   mysql -u root -p < database_schema.sql
   ```
   Or import via phpMyAdmin:
   - Open phpMyAdmin (http://localhost/phpmyadmin)
   - Create new database: `finbear_db`
   - Import `database_schema.sql`

## Backend Setup

1. **Install Dependencies**:
   ```bash
   cd backend
   npm install
   ```

2. **Environment Configuration**:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` file (default Laragon settings):
   ```
   PORT=3000
   NODE_ENV=development
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=finbear_db
   JWT_SECRET=your_super_secret_jwt_key
   JWT_EXPIRES_IN=7d
   FRONTEND_URL=http://localhost:5173
   ```

3. **Start Backend Server**:
   ```bash
   npm run dev
   ```

## Frontend Setup

1. **Install Dependencies**:
   ```bash
   cd frontend
   npm install
   ```

2. **Start Frontend Server**:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /auth/signup` - Register new user
- `POST /auth/login` - User login

### Modules
- `GET /modules` - Get all modules
- `GET /modules/:id` - Get specific module

### Finance
- `POST /finance/transaction` - Add transaction
- `GET /finance/transactions` - Get user transactions
- `DELETE /finance/transaction/:id` - Delete transaction

### Quiz
- `GET /kuis/:id` - Get quiz with questions

### User Progress
- `POST /user/points` - Complete module
- `GET /user/progress/:moduleId` - Check progress

## Frontend API Usage

Frontend calls API through Vite proxy:
```javascript
// Example API call
fetch('/api/modules') // Proxies to http://localhost:3000/modules
  .then(res => res.json())
  .then(data => console.log(data))
```

## Testing

1. Test backend: http://localhost:3000
2. Test frontend: http://localhost:5173
3. Test API: http://localhost:3000/modules

## Database Schema

The following tables are created:
- `users` - User accounts
- `modules` - Learning modules
- `quizzes` - Quiz data
- `quiz_questions` - Quiz questions
- `quiz_options` - Multiple choice options
- `user_progress` - User module progress
- `quiz_attempts` - Quiz results
- `achievements` - Achievement system
- `user_achievements` - User earned achievements
- `financial_records` - Finance tracking

## Troubleshooting

1. **Database Connection Failed**:
   - Check Laragon MySQL is running
   - Verify database name and credentials
   - Check .env file configuration

2. **CORS Issues**:
   - Backend CORS is configured for all origins
   - Vite proxy handles development CORS

3. **Module Not Found**:
   - Run database schema to populate sample data
   - Check database connection

## Default Users

- Username: `admin`, Email: `admin@finbear.com`, Password: `password`
- Username: `user1`, Email: `user1@example.com`, Password: `password`

*Note: Passwords are hashed, use these for testing*
