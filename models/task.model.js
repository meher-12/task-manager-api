const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({
    title: String,
    status: String,
    priority: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        index: true   // ✅ Index on userId
    }
}, { timestamps: true });

// ✅ Compound Index
taskSchema.index({ status: 1, priority: 1 });
module.exports = mongoose.model("Task", taskSchema);