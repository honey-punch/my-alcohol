import { Pool } from "pg";

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export const query = async (
  text: string,
  params?: (string | number | boolean)[]
) => {
  const client = await pool.connect();

  try {
    const result = await client.query(text, params);
    return result.rows;
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  } finally {
    client.release();
  }
};
