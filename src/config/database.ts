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
    try {
        await pool.connect();
        console.log("Database connected");
    } catch (error) {
        console.error("Database connection error", error);
    }
}

export { pool, connect };