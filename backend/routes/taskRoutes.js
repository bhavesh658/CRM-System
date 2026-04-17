const express = require("express");

const router = express.Router();


const { 
     getTasks, 
     updateTaskStatus, 
     } = require("../controllers/taskController");

router.get("/all/:leadId", getTasks);
// router.get("/:leadId", getTask);
router.put("/:id/status", updateTaskStatus);

module.exports = router;   