import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
import morgan from "morgan";

const app = express();

// Middlewares
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
}));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// Routes
import leadRouter from "./routes/lead.routes.js";
import adminRouter from "./routes/admin.routes.js";

app.use("/api/leads", leadRouter);
app.use("/api/admin", adminRouter);

app.use(errorHandler);

export default app;
