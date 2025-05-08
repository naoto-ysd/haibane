import { Hono } from 'hono'
import mysql from 'mysql2/promise'

// Hono アプリケーションのインスタンス化
const app = new Hono()

// MySQL との接続プール
const pool = mysql.createPool({
  host:     'localhost',
  user:     'your_db_user',
  password: 'your_db_password',
  database: 'your_database',
  port:     3306,
  waitForConnections: true,
  connectionLimit:    10,
})

// /users エンドポイントでユーザー一覧を返却
app.get('/users', async (c) => {
  const [rows] = await pool.query('SELECT id, name, email FROM users')
  return c.json(rows)
})

// サーバー起動（3000番ポート）
app.listen(3000)