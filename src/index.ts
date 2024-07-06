import express from 'express';
import { connect } from './config/database';
import { env } from './config/env';

const app = express();
const port = env.port;

async function start() {
    await connect();
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}

start();