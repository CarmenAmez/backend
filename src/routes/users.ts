import express, { Request, Response } from 'express';
import { getAllUsers } from '../models/users';
import { loginUser, registerUser } from '../controllers/users';

const router = express.Router();

// Ruta para registro de usuario
router.post('/register', registerUser);
router.post('/login', loginUser);

// Obtener todos los usuarios
router.get('/', async (req: Request, res: Response) => {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los usuarios.' });
    }
});

export default router;
