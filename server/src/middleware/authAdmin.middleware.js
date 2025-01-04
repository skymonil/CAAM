import jwt from "jsonwebtoken";
import Admin from "../models/Admin.model.js";

export const authenticateAdmin = async (req, res, next) => {
  try {
    const jwt_token = req.cookies?.token;

    if (!jwt_token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - NO Token Provided" });
    }

    const decoded_token = jwt.verify(jwt_token, process.env.SECRET_KEY);

    // console.log(decoded_token);
    

    if (!decoded_token) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    const admin = await Admin.findById(decoded_token.userID).select(
      "-password"
    );

    // console.log(student);
    

    if (!admin) {
      return res.status(401).json({ message: "Unauthorized - Admin Not Found" });
    }

    req.admin = admin;
    next();
  } catch (err) {
    console.log("Error in authentication middleware: " + err);
    res.status(500).json({ message: "Internal server error" });
  }
};
