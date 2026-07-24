import { body, validationResult } from "express-validator";

const validation = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation failed!");
    error.status = 400;
    error.errors = errors.array();
    return next(error);
  }

  next();
};

export const leadValidationRules = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("Name can only contain letters and spaces"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email must be valid")
    .normalizeEmail(),

  body("budgetRange")
    .trim()
    .notEmpty()
    .withMessage("Budget range is required")
    .isIn(["< ₹10,000", "₹10k - ₹50k", "₹50k - ₹1L", "> ₹1L"])
    .withMessage("Please select a valid budget range"),

  body("message")
    .trim()
    .notEmpty()
    .withMessage("Message is required")
    .isLength({ min: 10 })
    .withMessage("Message must be at least 10 characters long"),

  validation,
];
