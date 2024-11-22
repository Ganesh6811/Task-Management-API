import express from "express";
import pg from "pg";
import bodyParser from "body-parser";
import moment from "moment";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';


const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "TaskManagement",
    password: "Ganesh@6811",
    port: 5432,
});

//Connect database
db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
    } else {
        console.log("Connected to the database");
    }
});

const app = express();
const port = 3000;
const authenticateJWT = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) {
        return res.status(401).json({ error: "Access denied, No token provided." });
    }
    jwt.verify(token, "Ganesh_Gana", (err, user) => {
        if (err) {
            return res.status(403).json({ error: "Token is not valid" });
        }
        req.user = user;
        next();
    });
};


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use("/tasks", authenticateJWT);
app.use("/tasks/:id", authenticateJWT);


//Get the All Tasks 
app.get("/tasks", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM tasks");
        console.log(result.rows);
        res.send(result.rows);
    } catch (err) {
        console.error("Error retrieving data:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//Get the Task by using ID
app.get("/tasks/:id", async (req, res) => {
    const task_id = req.params["id"];
    try {
        const result = await db.query("SELECT * FROM tasks WHERE id = $1", [task_id]);
        if (result.rows.length > 0) {
            res.send(result.rows);
        } else {
            console.log("Task not found");
            res.status(404).send("Task not found");
        }
    } catch (err) {
        console.error("Error retrieving task:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//Filtering the Tasks by using status and priority
app.get("/status/priority", async(req,res)=>{
    const {status,priority} = req.body;
    try {
        const result = await db.query("SELECT * FROM tasks WHERE status = $1 and priority =$2", [status,priority]);
        if (result.rows.length > 0) {
            res.send(result.rows);
        } else {
            console.log("Task not found");
            res.status(404).send("Task not found");
        }
    } catch (err) {
        console.error("Error retrieving task:", err);
        res.status(500).json({ error: "Task retriving error" });
    }
});


//Sorting the data based on the priority or due_date
app.get("/sort", async (req, res) => {
    const { col, typ } = req.body;

    const validColumns = [ "priority", "due_date"];
    const validSortDirections = ["asc", "desc"];

    if (!validColumns.includes(col)) {
        return res.status(400).json({ error: "Invalid column name for sorting." });
    }
    if (!validSortDirections.includes(typ)) {
        return res.status(400).json({ error: "Invalid sorting direction. Use 'asc' or 'desc'." });
    }

    try {
        const result = await db.query(`SELECT * FROM tasks ORDER BY ${col} ${typ}`);

        if (result.rows.length > 0) {
            res.send(result.rows);
        } else {
            res.send("No tasks found.");
        }
    } catch (err) {
        console.error("Error retrieving tasks:", err);
        res.status(500).send("An error occurred while retrieving tasks.");
    }
});
 

// Search Tasks by Title or Description
app.get("/search", async (req, res) => {
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ error: "Query parameter is required for search." });
    }

    try {
        const result = await db.query(
            "SELECT * FROM tasks WHERE title ILIKE $1 OR description ILIKE $1",
            [`%${query}%`]
        );

        if (result.rows.length > 0) {
            res.send(result.rows);
        } else {
            res.status(404).json({ message: "No tasks found matching the search criteria." });
        }
    } catch (err) {
        console.error("Error searching tasks:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


//Register the user
app.post("/auth/register", async(req,res)=>{
    const {username, password}=req.body;
    const hashedpassword = await bcrypt.hash(password,10);
    try{
        await db.query("INSERT INTO users (username,password) values ($1,$2)",[username,hashedpassword]);
        console.log("Data is inserted in users table");
        res.status(200).json({message:"username details are saved"});
    }
    catch(err){
        console.log("Error while inserting the user details:",err);
        res.status(500);
    }  
});

//Login the user and create the token
app.post("/auth/login", async(req,res)=>{
    const { username, password } = req.body;

    try {
        const result = await db.query("SELECT * FROM users WHERE username = $1", [username]);
        if (result.rows.length === 0) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const user = result.rows[0];
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({ error: "Invalid credentials" });
        }
        const token = jwt.sign({ userId: user.id }, "Ganesh_Gana", { expiresIn: '1h' });
        res.json({ token });
    } 
    catch (err) {
        console.error("Error logging in user:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//Adding the Tasks
app.post("/tasks", async (req, res) => {
    const { title, description, status, priority, due_date } = req.body;
    if (moment(due_date).isBefore(moment(), 'day')) {
        return res.status(400).json({ error: "Due date cannot be in the past." });
    }
    try {
        await db.query(
            "INSERT INTO tasks (title, description, status, priority, due_date) VALUES ($1, $2, $3, $4, $5)",
            [title, description, status, priority, due_date]
        );
        res.status(201).json({ message: "Task created successfully" });
    } catch (err) {
        console.error("Error storing data:", err);
        res.status(500).json({ error: "Error storing the data" });
    }
});

//Updating the tasks
app.put("/tasks/:id", async (req, res) => {
    const task_id = req.params["id"];
    const { title, description, status, priority, due_date } = req.body;
    if (moment(due_date).isBefore(moment(), 'day')) {
        return res.status(400).json({ error: "Due date cannot be in the past." });
    }

    try {
        const result = await db.query(
            "UPDATE tasks SET title = $1, description = $2, status = $3, priority = $4, due_date = $5 WHERE id = $6",
            [title, description, status, priority, due_date, task_id]
        );
        if (result.rowCount > 0) {
            res.status(200).json({ message: "Task updated successfully" });
        } else {
            res.status(404).json({ message: "Task not found" });
        }
    } catch (err) {
        console.error("Error updating task:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


//Deleting the Tasks
app.delete("/delete/tasks/:id", async (req, res) => {
    const task_id = req.params["id"];
    try {
        const result = await db.query("SELECT * FROM tasks WHERE id = $1", [task_id]);
        if (result.rows.length > 0) {
            await db.query("DELETE FROM tasks WHERE _id = $1", [task_id]);
            res.status(200).json({ message: "Task deleted successfully" });
        } else {
            res.status(404).json({ message: "Task not found" });
        }
    } catch (err) {
        console.error("Error deleting task:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
