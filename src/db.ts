import mysql from 'mysql2/promise';  // Importamos la versión con promesas de mysql2
import dotenv from 'dotenv';

dotenv.config();

export const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'Planeo',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});