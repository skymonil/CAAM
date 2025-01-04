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

export const getAdmincredential = async (req, res) => {
    try {
        const AdminEmail = req.admin.email;
        const collegeName = await Admin.findOne({ email: AdminEmail }).select("collegeName");

        console.log(collegeName);
        

        if (!collegeName) {
            return res.status(404).json({ message: "admin not found" });
        }

        const admins = await Admin.find({ collegeName: collegeName.collegeName }).select("username role password");

        console.log(admins);

        if (!admins || admins.length === 0) {
            return res.status(404).json({ message: "No admins found for this college" });
          }

        res.status(200).json({ admins });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server error", error });
    }
};
