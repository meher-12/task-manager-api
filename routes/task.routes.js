const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const {
    getTasks,
    createTask,
    updateTask,
    deleteTask
} = require("../controllers/task.controller");

router.get("/", auth, getTasks);
router.post("/", auth, createTask);
router.put("/:id", auth, updateTask);
router.delete("/:id", auth, deleteTask);

module.exports = router;