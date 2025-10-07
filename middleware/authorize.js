import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

export const authenticate = async (req, res, next) => {
  console.log(req.headers);
  const token = req.headers["authorization"]?.split("Bearer ")[1];
  console.log("token: ", token);
  if (!token) {
    console.log(token);
    return res.status(401).json({ message: "Unautherized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.userId);
  } catch (error) {
    return res.status(401).json({ message: "" + error.message });
  }

  next();
};
