import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import mysql from 'mysql2/promise'

// Hono アプリケーションのインスタンス化
const app = new Hono()

// MySQL との接続プール
const pool = mysql.createPool({
  host:     process.env.DB_HOST || 'localhost',
  user:     process.env.DB_USER || 'your_db_user',
  password: process.env.DB_PASSWORD || 'your_db_password',
  database: process.env.DB_NAME || 'your_database',
  port:     Number(process.env.DB_PORT) || 3306,
  waitForConnections: true,
  connectionLimit:    10,
})

// /users エンドポイントでユーザー一覧を返却
app.get('/users', async (c) => {
  const [rows] = await pool.query('SELECT id, name, email FROM users')
  return c.json(rows)
})

// サーバー起動（3000番ポート）
serve({
  fetch: app.fetch,
  port: 3000
})