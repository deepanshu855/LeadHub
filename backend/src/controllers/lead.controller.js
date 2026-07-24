import leadModel from "../models/lead.model.js";

export const createLeadController = async (req, res, next) => {
  const { name, email, budgetRange, message } = req.body;

  const lead = await leadModel.create({
    name,
    email,
    budgetRange,
    message,
  });

  res.status(201).json({
    success: true,
    message: "Lead created successfully",
    lead,
  });
};

export const getLeadsController = async (req, res, next) => {
  const { id } = req.user;

  const leads = await leadModel.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    message: "Fetched all leads successfully",
    leads,
  });
};

export const statusUpdateController = async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;

  const allowedStatuses = ["new", "contacted", "close"];

  if (!status || !allowedStatuses.includes(status)) {
    const error = new Error("Status must be one of: new, contacted, close");
    error.status = 400;
    return next(error);
  }

  const lead = await leadModel.findByIdAndUpdate(
    id,
    {
      status,
    },
    { new: true },
  );

  if (!lead) {
    const error = new Error("Lead not found");
    error.status = 404;
    return next(error);
  }

  res.status(200).json({
    success: true,
    message: "Status updated successfully",
    lead,
  });
};
