import { RowDataPacket, ResultSetHeader } from 'mysql2';
import {pool}from '../db';


export async function getAllUsers() {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM Users');
    return rows;
}


export async function getUserById(userId: number) {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM Users WHERE id = ?', [userId]);
    return rows[0];
}

export async function getUserByEmail(email: string) {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM Users WHERE email = ?', [email]);
    return rows[0];
}


export async function createUser(name: string, email: string, password: string) {
    const [result] = await pool.query<ResultSetHeader>(
        'INSERT INTO Users (name, email, password) VALUES (?, ?, ?)',
        [name, email, password]
    );
    return { id: result.insertId, name, email };
}


export async function updateUser(userId: number, name: string, email: string, password: string) {
    const [result] = await pool.query<ResultSetHeader>(
        'UPDATE Users SET name = ?, email = ?, password = ? WHERE id = ?',
        [name, email, password, userId]
    );


    if (result.affectedRows === 0) {
        return null;
    }

    return { id: userId, name, email };
}


export async function deleteUser(userId: number) {
    const [result] = await pool.query<ResultSetHeader>(
        'DELETE FROM Users WHERE id = ?',
        [userId]
    );


    if (result.affectedRows === 0) {
        return null; 
    }

    return { message: 'Usuario eliminado correctamente.' };
}

