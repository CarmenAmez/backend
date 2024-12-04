import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(403).json({ message: 'Acceso denegado, se requiere token' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'defaultSecretKey');
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Token inválido o expirado' });
    }
};

export default verifyToken;
