const express = require("express");
const router = express.Router();
const { protect, isManager } = require("../middleware/authMiddleware");



const {
  getAllLeads,
  getAllTasks,
  getLeadById,
  getTaskById,
  assignLead,
  assignTask,
  taskupdate,
  deleteTask,
  deleteLead,
  allusers,
  createLead,
  updateLead,
  updateLeadStatus,
  getTasksByUser,
} = require("../controllers/managerController");



router.get("/leads", protect, isManager, getAllLeads); // Done
router.get("/lead/:id", protect, isManager, getLeadById); // Done
router.put("/lead/:id/assign", protect, isManager, assignLead); // Done
router.delete("/lead/:id", protect, isManager, deleteLead); // Done

router.post("/createlead", protect, isManager, createLead);// Done  // Create new lead
router.put("/lead/:id", protect, isManager, updateLead); // Update lead details
router.put("/lead/:id/status", protect, isManager, updateLeadStatus); // Update lead status


router.get("/tasks", protect, isManager, getAllTasks); // Done
router.get("/task/:id", protect, isManager, getTaskById); // Done
router.post("/task/assign", protect, isManager, assignTask); // Done
router.put("/task/:id/update", protect, isManager, taskupdate); // Done
router.delete("/task/:id", protect, isManager, deleteTask); // Done

router.get("/tasks/user/:userId", protect, isManager, getTasksByUser); // Get tasks by user


router.get("/allusers", protect, isManager, allusers); // Done



module.exports = router;