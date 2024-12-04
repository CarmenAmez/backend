import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';


const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];
    console.log('Token recibido:', token);
    if (!token) {
        return res.status(403).json({ message: 'Acceso denegado, se requiere token' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as string | JwtPayload;
        console.log('Token decodificado:', decoded); 
        (req as any).user = decoded;
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: 'Token inválido o expirado' });
    }
};



export default verifyToken;

