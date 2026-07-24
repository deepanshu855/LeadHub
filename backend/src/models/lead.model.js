import mongoose from "mongoose";

const leadSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    budgetRange: {
      type: String,
      enum: ["< ₹10,000", "₹10k - ₹50k", "₹50k - ₹1L", "> ₹1L"],
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["new", "contacted", "close"],
      default: "new",
      required: true,
    },
  },
  { timestamps: true },
);

const leadModel = mongoose.model("Lead", leadSchema);
export default leadModel;
