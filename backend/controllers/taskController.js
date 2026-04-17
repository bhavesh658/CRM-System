const taskModel = require("../models/Task");



module.exports.getTasks = async (req, res) => {
    try {
        const { leadId } = req.params;
        const tasks = await taskModel.find({ leadId });
        if (!tasks) {
            return res.status(404).json({ message: "No tasks found for this lead" });
        }
        res.status(200).json({ message: "Tasks retrieved successfully", tasks });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

module.exports.getTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await taskModel.findById(id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ message: "Task retrieved successfully", task });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

module.exports.updateTaskStatus = async (req, res) => {
    try {   
        const { id } = req.params;
        const { status } = req.body;

        const task = await taskModel.findByIdAndUpdate(id, { status }, { new: true });
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ message: "Task status updated", task });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

