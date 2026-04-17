const Lead = require("../models/Lead");
const Task = require("../models/Task");
const User = require("../models/User");



module.exports.getAllLeads = async (req, res) => {
  try {
    const leads = await Lead.find().populate("assignedTo", "name email");

    return res.status(200).json({
      success: true,
      count: leads.length,
      data: leads
    });

  } catch (err) {
    console.error("Get Leads Error:", err);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch leads"
    });
  }
};


module.exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("assignedTo", "name email")
      .populate("leadId", "name email");

    return res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks
    });

  } catch (err) {
    console.error("Get Tasks Error:", err);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch tasks"
    });
  }
};


module.exports.getLeadById = async (req, res) => {
  try {
    const { id } = req.params;
    const lead = await Lead.findById(id).populate("assignedTo", "name email");

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found"
      });
    }
    return res.status(200).json({
      message: "Lead fetched by ID successfully",
      success: true,
      data: lead
    });

  } catch (err) {
    console.error("Get Lead By ID Error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch lead"
    });
  }
};

module.exports.getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id)
      .populate("assignedTo", "name email")
      .populate("leadId", "name email");

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }
    return res.status(200).json({
      message: "Task fetched by ID successfully",
      success: true,
      data: task
    });

  } catch (err) { 
    console.error("Get Task By ID Error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch task"
    });
  }
};


module.exports.assignLead = async (req, res) => {
  try {
    const { userId } = req.body;
    const { id } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required"
      });
    }

    const lead = await Lead.findById(id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found"
      });
    }

    lead.assignedTo = userId;
    await lead.save();

    return res.status(200).json({
      success: true,
      message: "Lead assigned successfully",
      data: lead
    });

  } catch (err) {
    console.error("Assign Lead Error:", err);

    return res.status(500).json({
      success: false,
      message: "Failed to assign lead"
    });
  }
};




module.exports.assignTask = async (req, res) => {
  try {
    const { title, description, assignedTo, leadId, dueDate } = req.body;

    
    if (!title || !assignedTo || !leadId) {
      return res.status(400).json({
        success: false,
        message: "Title, assignedTo, and leadId are required"
      });
    }

    const task = await Task.create({
      title,
      description,
      assignedTo,
      leadId,
      dueDate,
      status: "pending"
    });

    console.log("Task Created:", task);

    return res.status(201).json({
      success: true,
      message: "Task assigned successfully",
      data: task
    });

  } catch (err) {
    console.error("Assign Task Error:", err);

    return res.status(500).json({
      success: false,
      message: "Failed to assign task"
    });
  }
};

module.exports.taskupdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required"
      });
    }

    const task = await Task.findById(id);

    if (!task) {  
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }

    task.status = status;
    await task.save();
    return res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: task
    });
  } catch (err) {
    console.error("Update Task Error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to update task"
    });
  }
};


module.exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }

    await task.remove();

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully"
    });
  } catch (err) {
    console.error("Delete Task Error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to delete task"
    });
  }
};

module.exports.deleteLead = async (req, res) => {
  try {
    const { id } = req.params;
    const lead = await Lead.findById(id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found"
      });
    }
    await lead.remove();
    return res.status(200).json({
      success: true,
      message: "Lead deleted successfully"
    });
  } catch (err) {
    console.error("Delete Lead Error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to delete lead"
    });
  }
};


module.exports.allusers = async (req, res) => {
  try {
    const users = await User.find()
    return res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (err) {
    console.error("Get All Users Error:", err);
    return res.status(500).json({ 
      success: false,
      message: "Failed to fetch users"
    });
  } 
};


module.exports.createLead = async (req, res) => {
  try {
      const { name, email, phone} = req.body;
      if (!name || !email) {
          return res.status(400).json({
              success: false,
              message: "Name and email are required"
          });
      }
      const lead = await Lead.create({
          name,
          email,
          phone,
          status: "new"
      });
      return res.status(201).json({
          success: true,
          message: "Lead created by manager successfully",
          data: lead
      });
  }
  catch (err) {
      console.error("Create Lead Error:", err);
      return res.status(500).json({
          success: false,
          message: "Failed to create lead"
      });
  }
}


module.exports.updateLead = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    const lead = await Lead.findById(id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found"
      });
    }

    lead.name = name || lead.name;
    lead.email = email || lead.email;
    lead.phone = phone || lead.phone;
    await lead.save();

    return res.status(200).json({
      success: true,
      message: "Lead updated by manager successfully",
      data: lead
    });
  } catch (err) {
    console.error("Update Lead Error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to update lead"
    });
  }
}

module.exports.updateLeadStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required"
      });
    }

    const lead = await Lead.findById(id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found"
      });
    }
    lead.status = status;
    await lead.save();
    return res.status(200).json({
      success: true,
      message: "Lead status updated by manager successfully",
      data: lead
    });
  } catch (err) {
    console.error("Update Lead Status Error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to update lead status"
    });
  }
}

module.exports.getTasksByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const tasks = await Task.find({ assignedTo: userId })
      .populate("assignedTo", "name email")
      .populate("leadId", "name email");
    return res.status(200).json({
      message: "Tasks fetched for user successfully by manager",
      success: true,
      count: tasks.length,
      data: tasks
    });
  } catch (err) {
    console.error("Get Tasks By User Error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch tasks for user"
    }); 
  }
}
