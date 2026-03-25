require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
const userRoutes = require("./routes/user.routes");
const taskRoutes = require("./routes/task.routes");

app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

// Test route
app.get("/", (req, res) => {
    res.send("API Running");
});
// DB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("DB Connected"))
.catch(err => console.log(err));

// Server
app.listen(process.env.PORT || 5000, () => {
    console.log("Server running");
});