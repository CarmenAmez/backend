import { pool } from '../db'; // Asegúrate de que la conexión a la base de datos esté configurada correctamente
import { RowDataPacket, ResultSetHeader, FieldPacket } from 'mysql2'; // Importar los tipos correctos

// Definir la función createProjectInDb
export async function createProjectInDb({ name, description, start_date, end_date, team_id }: { name: string, description: string, start_date: string, end_date: string, team_id: number }) {
    try {
        // Verificar si el team_id existe en la tabla Teams
        const [team]: [RowDataPacket[], FieldPacket[]] = await pool.query('SELECT * FROM Teams WHERE id = ?', [team_id]);
        if (team.length === 0) { // Revisamos si existe el equipo
            throw new Error('El equipo no existe');
        }

        // Insertar el nuevo proyecto en la base de datos
        const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query(
            `INSERT INTO Projects (team_id, name, description, start_date, end_date) 
            VALUES (?, ?, ?, ?, ?)`, 
            [team_id, name, description, start_date, end_date]
        );

        // Retornar el proyecto creado con la ID generada
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
