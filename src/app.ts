import "reflect-metadata";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import { AppDataSource } from "./config/data-source";
import userRoutes from "./routes/user.routes";
import folderRoutes from "./routes/folder.routes";
import valutRoutes from "./routes/valut.routes";
import authRoutes from "./routes/auth.routes";
import { errorHandler } from "./middlewares/error.middleware";

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// Apply middlewares
app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// Enable pre-flight requests for all routes
app.options(
  "*",
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", folderRoutes);
app.use("/api", valutRoutes);

// Root route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Password Manager API" });
});

// Error handling middleware
app.use(errorHandler);

// Initialize database connection
console.log("Attempting to connect to database...");
AppDataSource.initialize()
  .then(() => {
    console.log("Database connection established");

    // Start server
    startServer();
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
    console.log("Starting server without database connection for testing...");

    // Start server anyway for testing
    startServer();
  });

// Function to start the server
function startServer() {
  try {
    const server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`API Documentation available at http://localhost:${PORT}/`);
      console.log(`Environment: ${process.env.NODE_ENV}`);
    });

    server.on("error", (error) => {
      console.error("Server error:", error);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
}

export default app;
