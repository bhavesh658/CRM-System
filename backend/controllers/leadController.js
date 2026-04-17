const Lead = require("../models/Lead");






module.exports.createLead = async (req, res) => {
    try {
        const { name, email, phone } = req.body;
        const newLead = new Lead({ name, email, phone });
        await newLead.save();
        res.status(201).json({ message: "Lead created successfully", lead: newLead });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};




module.exports.getLeads = async (req, res) => {
    try {
        const leads = await Lead.find();
        res.status(200).json({ message: "Leads retrieved successfully", leads });

        if (!leads) {
            return res.status(404).json({ message: "No leads found" });
        }

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }   
};





module.exports.updateLeadStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const lead = await Lead.findByIdAndUpdate(id, { status }, { new: true });
        if (!lead) {
            return res.status(404).json({ message: "Lead not found" });
        }
        res.status(200).json({ message: "Lead status updated", lead });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};



module.exports.deleteLead = async (req, res) => {
    try {
        const { id } = req.params;
        const lead = await Lead.findByIdAndDelete(id);
        if (!lead) {
            return res.status(404).json({ message: "Lead not found" });
        }
        res.status(200).json({ message: "Lead deleted" });
    } catch (error) {   
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};