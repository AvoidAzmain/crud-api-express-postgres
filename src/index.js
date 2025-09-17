import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import errorHandling from "./middlewares/errorHandler.js";
import createUserTable from "./data/createUserTable.js";
console.log("starting server")

dotenv.config({path:"./.env"});

const app = express();
const port = process.env.PORT || 3001;

//middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api",userRoutes)

// error handling
app.use(errorHandling)

//create user table before stating 
createUserTable()


//testing postgree connection
app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT current_database()");
    res.send(`database name is ${result.rows[0].current_database}`);
  } catch (err) {
    console.error("DB error:", err.message);
    res.status(500).send("Database connection failed");
  }
});





//server running 
app.listen(port,()=>{
    console.log(`server is running seemlessly at port: ${port}`)
})