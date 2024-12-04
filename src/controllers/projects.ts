import { createProjectInDb } from '../models/projects'; // Importar la función desde el modelo
import { Request, Response } from 'express';

export const createProject = async (req: Request, res: Response) => {
    try {
        const { name, description, start_date, end_date, team_id } = req.body;

        // Verificar que todos los campos necesarios estén presentes
        if (!name || !description || !start_date || !team_id) {
            return res.status(400).json({ message: 'Faltan campos obligatorios' });
        }

        // Llamar a la función del modelo para crear el proyecto en la base de datos
        const newProject = await createProjectInDb({ name, description, start_date, end_date, team_id });

        // Si el proyecto se crea correctamente, devolver el nuevo proyecto
        res.status(201).json({ message: 'Proyecto creado exitosamente', project: newProject });
    } catch (error) {
        console.error('Error al crear el proyecto:', error);
        res.status(500).json({ message: 'Error al crear el proyecto' });
    }
};

