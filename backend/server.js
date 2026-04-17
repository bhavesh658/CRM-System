const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const leadRoutes = require("./routes/leadRoutes");
const authRoutes = require("./routes/authRoutes");
const managerRoutes = require("./routes/managerRoutes");
const TaskRoutes = require("./routes/taskRoutes");


dotenv.config();
connectDB(); 

const app = express();
app.use(express.json());



app.use("/api/auth", authRoutes);
app.use("/api/manager", managerRoutes);


app.use("/api/tasks", TaskRoutes);
app.use("/api/leads", leadRoutes);


app.get("/", (req,res)=>{
    res.send("API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> console.log(`Server running on ${PORT}`));