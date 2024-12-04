import { pool } from '../db'; // Asegúrate de que la conexión a la base de datos esté configurada correctamente
import { RowDataPacket, ResultSetHeader, FieldPacket } from 'mysql2'; // Importar los tipos correctos

// Definir la función createProjectInDb
export async function createProjectInDb({ name, description, start_date, end_date, team_id }: { name: string, description: string, start_date: string, end_date: string, team_id: number }) {
    try {
        const [team]: [RowDataPacket[], FieldPacket[]] = await pool.query('SELECT * FROM Teams WHERE id = ?', [team_id]);
        if (team.length === 0) {
            throw new Error('El equipo no existe');
        }

        const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query(
            `INSERT INTO Projects (team_id, name, description, start_date, end_date) 
            VALUES (?, ?, ?, ?, ?)`, 
            [team_id, name, description, start_date, end_date]
        );

        return { 
            id: result.insertId, 
            team_id, 
            name, 
            description, 
            start_date, 
            end_date 
        };
    } catch (error) {
        console.error('Error al insertar el proyecto:', error);
        throw new Error('Error al crear el proyecto');
    }
}
