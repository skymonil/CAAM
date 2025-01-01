import jwt from "jsonwebtoken";
import Student from "../models/Student.model.js";

export const authenticate = async (req, res, next) => {
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
