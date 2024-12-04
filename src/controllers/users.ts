import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createUser, getUserByEmail } from '../models/users';

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const userId = await createUser(name, email, hashedPassword);

        res.status(201).json({ message: 'Usuario registrado exitosamente', userId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al registrar el usuario' });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Correo electrónico y contraseña son requeridos' });
        }

        const JWT_SECRET = process.env.JWT_SECRET;
        if (!JWT_SECRET) {
            throw new Error('La clave JWT_SECRET no está definida en el archivo .env');
        }

        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(401).json({ message: 'Usuario/Contraseña incorrecta' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Usuario/Contraseña incorrecta' });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
        res.json({
            message: 'Inicio de sesión exitoso',
            token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
};
