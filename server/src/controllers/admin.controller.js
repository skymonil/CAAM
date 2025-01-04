import Admin from '../models/Admin.model.js';

export const getAdmin = async (req, res) => {
    try {
        const AdminEmail = req.admin.email;
        const admin = await Admin.findOne({ email: AdminEmail });

        if (!admin) {
            return res.status(404).json({ message: "admin not found" });
        }

        res.json({ id: admin._id, name: admin.username, email: admin.email, role: admin.role, collegeName: admin.collegeName });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error });
    }
};
