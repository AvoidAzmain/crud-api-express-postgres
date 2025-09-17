import pkg from "pg"
import dotenv from "dotenv"
const {Pool} = pkg;
dotenv.config({path:"./.env"})

console.log("ENV PORT:", process.env.PORT);
console.log("ENV DB:", process.env.DB_NAME);

//creating pool for database
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
})

pool.on("connect",() => {
    console.log("database connected")
}) 

export default pool;
