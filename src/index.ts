// src/index.ts
import express from 'express';
import { connect } from './config/database';
import { env } from './config/env';
import userRoutes from './users/userRoutes';
import streetRoutes from './streets/streetRoutes';
import suggestionRoutes from './suggestions/suggestionRoutes';
import notificationRoutes from './notifications/notificationRoutes';

const app = express();
const port = env.port;

app.use(express.json());
app.use('/users', userRoutes);
app.use('/streets', streetRoutes);
app.use('/suggestions', suggestionRoutes);
app.use('/notifications', notificationRoutes);

app.get('/', (_req, res) => {
    res.send('Welcome to the best API 🚬');
});

async function start() {
    try {
        await connect();
        app.listen(port, () => {
            console.log(`Server running on port http://localhost:${port} 🚀`);
        });
    } catch (error) {
        console.error("Failed to start server due to database connection error:", error);
        process.exit(1);
    }
}

start();
