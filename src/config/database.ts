// src/config/database.ts
import { Pool } from "pg";
import { env } from "./env";

const pool = new Pool({
    host: env.db.host,
    port: Number(env.db.port),
    user: env.db.user,
    password: env.db.password,
    database: env.db.database,
});

async function connect() {
    let retries = 5;
    while (retries) {
        try {
            await pool.connect();
            console.log("Database connected ✅");
            break;
        } catch (error) {
            retries -= 1;
            console.error(`Database connection error ❌, retries left: ${retries}`, error);
            if (retries === 0) {
                throw error;
            }
            await new Promise(res => setTimeout(res, 5000));
        }
    }
}

export { pool, connect };
