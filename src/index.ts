// src/index.ts
import express from 'express';
import { connect } from './config/database';
import { env } from './config/env';
import userRoutes from './users/userRoutes';

const app = express();
const port = env.port;

app.use(express.json());
app.use('/users', userRoutes);

async function start() {
    try {
        await connect();
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (error) {
        console.error("Failed to start server due to database connection error:", error);
        process.exit(1);
    }
}

start();
