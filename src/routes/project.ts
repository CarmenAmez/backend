import express, { Request, Response } from 'express';
import { pool } from '../db'; 
import verifyToken from '../controllers/verifyToken';
import { ResultSetHeader } from 'mysql2'; 

const router = express.Router();

// Crear proyecto
router.post('/', verifyToken, async (req: Request, res: Response) => {
    try {
        const { name, description, start_date, end_date, team_id } = req.body;

        if (!name || !start_date || !team_id) {
            return res.status(400).json({ message: 'Faltan campos obligatorios' });
        }

        const [result] = await pool.query<ResultSetHeader>('INSERT INTO Projects (team_id, name, description, start_date, end_date) VALUES (?, ?, ?, ?, ?)', [
            team_id, name, description, start_date, end_date
        ]);

        const projectId = result.insertId;

        res.status(201).json({ message: 'Proyecto creado exitosamente', projectId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el proyecto' });
    }
});

export default router;
