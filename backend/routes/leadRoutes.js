const express = require("express");
const { createLead,getLeads,updateLeadStatus,deleteLead } = require("../controllers/leadController");

const router = express.Router();

router.post("/createlead", createLead);
router.get("/allleads", getLeads);
router.put("/leads/:id/status", updateLeadStatus);
router.delete("/leads/:id", deleteLead);



module.exports = router;