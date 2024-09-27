require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const subdomain = require("express-subdomain");
const path = require("path");

const connectDB = require("./utils/db");
const authRouter = require("./router/auth-router");
const uploadRouter = require("./router/upload-router");
const adminRouter = require("./router/admin-router");
const managerRouter = require("./router/manager-router");

const PORT = process.env.PORT;
const ORIGINS = process.env.ORIGINS ? process.env.ORIGINS.split(",") : [];

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ORIGINS,
    credentials: true,
  })
);

// Serve static files from the 'uploads' directory
app.use("/api/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api", authRouter);
app.use("/api", uploadRouter);
app.use(subdomain("admin", adminRouter));
app.use(subdomain("manager", managerRouter));

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
