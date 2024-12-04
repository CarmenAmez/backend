import express from 'express';
import cors from 'cors';
import userRoutes from './routes/users';
import authRoutes from './routes/auth';
import projectRoutes from './routes/project';  // Agregado para la nueva ruta de proyectos

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/projects', projectRoutes);  // Rutas para proyectos

// Servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
