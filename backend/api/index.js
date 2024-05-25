const express = require("express");
const companyRouter = require("../src/routes/company.route.js"); // make sure the path points to your anomaly router file
const projectRouter = require("../src/routes/project.routes.js");
const userRouter = require("../src/routes/user.routes.js");
const datastreamRouter = require("../src/routes/drive.routes.js");
const donationRouter = require("../src/routes/donation.routes.js");
const app = express();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});
app.use(express.json());

app.use("/company", companyRouter);
app.use("/drive", datastreamRouter);
app.use("/project", projectRouter);
app.use("/user", userRouter);
app.use("/donation", donationRouter);


app.get("/", (req, res) => {
  console.info("INFO: Server Started Successfully");
  res.json({ "message:": "Welcome to CIVIC API" });
});
// Error handling middleware
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// Export the server for Vercel
module.exports = app;
