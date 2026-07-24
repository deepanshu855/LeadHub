import adminModel from "../models/admin.model.js";
import jwt from "jsonwebtoken";

export const loginAdminController = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await adminModel.findOne({ email });

  if (!user) {
    const error = new Error("Invalid credentials");
    error.status = 403;
    return next(error);
  }

  const isValidPassword = await user.comparePassword(password);

  if (!isValidPassword) {
    const error = new Error("Invalid credentials");
    error.status = 403;
    return next(error);
  }

  const token = jwt.sign({ id: user._id, email }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.cookie("token", token);

  res.status(200).json({
    success: true,
    message: "Login successfully",
    user: {
      id: user._id,
      email,
      username: user.username,
    },
  });
};

export const registerAdminController = async (req, res, next) => {
  const adminCount = await adminModel.countDocuments();

  if (adminCount >= 2) {
    const error = new Error(
      `Maximum admin limit reached. Currently ${adminCount} admins exist.`,
    );
    error.status = 403;
    return next(error);
  }

  const { email, password } = req.body;

  const isUserAlreadyExists = await adminModel.findOne({
    email,
  });

  if (isUserAlreadyExists) {
    const error = new Error("Admin already exists with email");
    error.status = 409;
    return next(error);
  }

  const user = await adminModel.create({
    email,
    password,
  });

  const token = jwt.sign({ id: user._id, email }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.cookie("token", token);

  res.status(201).json({
    success: true,
    message: "Admin created successfully",
    admin: {
      email,
    },
  });
};
