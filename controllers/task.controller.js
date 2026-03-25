const Task = require("../models/task.model");

let cache = {
    data: null,
    timestamp: null
};

const clearCache = () => {
    cache = { data: null, timestamp: null };
};

// GET ALL TASKS
exports.getTasks = async (req, res) => {
    const now = Date.now();

    if (cache.data && (now - cache.timestamp < 60000)) {
        return res.json({ source: "cache", data: cache.data });
    }

    const tasks = await Task.find({ userId: req.user.id });

    cache = {
        data: tasks,
        timestamp: now
    };

    res.json({ source: "db", data: tasks });
};

// CREATE TASK
exports.createTask = async (req, res) => {
    const task = await Task.create({
        ...req.body,
        userId: req.user.id
    });

    clearCache();
    res.status(201).json(task);
};

// UPDATE TASK
exports.updateTask = async (req, res) => {
    const task = await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    clearCache();
    res.json(task);
};
// DELETE TASK
exports.deleteTask = async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);

    clearCache();
    res.json({ message: "Deleted" });
};