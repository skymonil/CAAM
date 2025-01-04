import Admin from "../models/Admin.model.js";
import bcrypt from "bcryptjs";

export const getCredentials = async (req, res) => {
  try {
    // Ensure user is authenticated
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const superAdminId = req.user._id;
    console.log("Super Admin ID:", superAdminId);

    // Fetch the super admin
    const superAdmin = await Admin.findById(superAdminId).select("collegeName");

    if (!superAdmin) {
      return res.status(404).json({ message: "Super Admin not found" });
    }

    const { collegeName } = superAdmin;

    // Fetch all admins for the college
    const admins = await Admin.find({ collegeName }).select("username role"); // Include only necessary fields

    if (!admins || admins.length === 0) {
      return res.status(404).json({ message: "No admins found for this college" });
    }

    // Prepare the response
    const adminCredentials = admins.map((admin) => ({
      username: admin.username,
      role: admin.role,
    }));

    console.log("Admin credentials:", adminCredentials);

    return res.status(200).json({ admins: adminCredentials });
  } catch (error) {
    console.error("Error in getCredentials controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { username } = req.params;
    const { newPassword } = req.body;

    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    admin.password = hashedPassword;

    await admin.save();

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error in admin changePassword controller:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
