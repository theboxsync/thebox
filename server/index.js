require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

const connectDB = require("./utils/db");
const uploadRouter = require("./router/upload-router");
const managerRouter = require("./router/managerRoutes");
const captainRouter = require("./router/captainRoutes");
const chargeRouter = require("./router/chargeRoutes");
const feedbackRouter = require("./router/feedbackRoutes");
const inventoryRouter = require("./router/inventoryRoutes");
const kotRouter = require("./router/kotRoutes");
const menuRouter = require("./router/menuRoutes");
const orderRouter = require("./router/orderRoutes");
const qsrRouter = require("./router/qsrRoutes");
const staffRouter = require("./router/staffRoutes");
const subscriptionRouter = require("./router/subscriptionRoutes");
const tableRouter = require("./router/tableRoutes");
const userRouter = require("./router/userRoutes");
const inquiryRouter = require("./router/inquiryRoutes");

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

app.use("/api", uploadRouter);
app.use("/api/captain", captainRouter);
app.use("/api/charge", chargeRouter);
app.use("/api/feedback", feedbackRouter);
app.use("/api/inventory", inventoryRouter);
app.use("/api/kot", kotRouter);
app.use("/api/manager", managerRouter);
app.use("/api/menu", menuRouter);
app.use("/api/order", orderRouter);
app.use("/api/qsr", qsrRouter);
app.use("/api/staff", staffRouter);
app.use("/api/subscription", subscriptionRouter);
app.use("/api/table", tableRouter);
app.use("/api/user", userRouter);
app.use("/api/inquiry", inquiryRouter);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
