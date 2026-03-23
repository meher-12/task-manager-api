const Task = require("../models/task.model");

let cache = {
    data: null,
    timestamp: null
};

// Get all tasks with caching
exports.getTasks = async (req, res) => {
    const now = Date.now();

    if (cache.data && (now - cache.timestamp < 60000)) {
        return res.json({
            source: "cache",
            data: cache.data
        });
    }

    const tasks = await Task.find();

    cache = {
        data: tasks,
        timestamp: now
    };

    res.json({
        source: "db",
        data: tasks
    });
};

// Clear cache helper
const clearCache = () => {
    cache = { data: null, timestamp: null };
};

// Create Task
exports.createTask = async (req, res) => {
    const task = await Task.create(req.body);
    clearCache();   // ✅ invalidate cache
    res.json(task);
};

// Update Task
exports.updateTask = async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    clearCache();
    res.json(task);
};

// Delete Task
exports.deleteTask = async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    clearCache();
    res.json({ message: "Deleted" });
};