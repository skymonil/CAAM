import Admin from "../models/Admin.model.js";
import bcrypt from "bcryptjs";

export const getCredentials = async (req, res) => {
  try {
    const superAdminId = req.user.id;
    console.log("super admin id: ",superAdminId);

    const superAdmin = await Admin.findById(superAdminId);

    if (!superAdmin) {
      return res.status(404).json({ message: "Super Admin not found" });
    }

    const { collegeName } = superAdmin;

    const admins = await Admin.find({ collegeName });

    if (!admins || admins.length === 0) {
      return res
        .status(404)
        .json({ message: "No admins found for this college" });
    }

    const adminCredentials = admins.map((admin) => ({
      username: admin.username,
      password: admin.password,
    }));

    return res.status(200).json({admins: adminCredentials});
  } catch (error) {
    console.error("Error in admin getCredentials controller", error);
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
