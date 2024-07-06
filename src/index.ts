import express from 'express';
import { env } from './config/env';

const app = express();
const port = env.port;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});