import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  }),
);
app.use(express.json());
app.use(cookieParser());
// app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "..", "public")));

// Routes
import leadRouter from "./routes/lead.routes.js";
import adminRouter from "./routes/admin.routes.js";

app.use("/api/leads", leadRouter);
app.use("/api/admin", adminRouter);

app.use("*name", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

app.use(errorHandler);

export default app;
