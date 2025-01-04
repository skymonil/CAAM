import jwt from "jsonwebtoken";
import Student from "../models/Student.model.js";
import Admin from "../models/Admin.model.js";

export const authenticateStudent = async (req, res, next) => {
  try {
    const jwt_token = req.cookies?.token;

    if (!jwt_token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - NO Token Provided" });
    }

    const decoded_token = jwt.verify(jwt_token, process.env.SECRET_KEY);

    if (!decoded_token) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    const student = await Student.findById(decoded_token._id).select(
      "-password"
    );

    if (!student) {
      return res.status(401).json({ message: "Unauthorized - Student Not Found" });
    }

    req.student = student;
    next();
  } catch (err) {
    console.log("Error in authentication middleware: " + err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const authenticateAdmin = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No Token Provided" });
    }

    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Unauthorized - Token Expired" });
      }
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    const admin = await Admin.findById(decodedToken._id).select("-password");

    if (!admin) {
      return res.status(401).json({ message: "Unauthorized - Admin Not Found" });
    }

    if (admin.role !== "superAdmin" && admin.role !== "docAdmin" && admin.role !== "marksAdmin" && admin.role !== "hod" && admin.role !== "accountantAdmin") {
      return res.status(403).json({ message: "Forbidden - Not an Admin" });
    }

    req.user = admin;
    console.log("req.user: ",req.user);
    next();
  } catch (err) {
    console.error("Error in authenticateAdmin middleware:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
