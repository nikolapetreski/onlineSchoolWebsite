const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const { requireAuth } = require("./middleware/authMiddleware");
const { checkUser } = require("./middleware/authMiddleware");

const app = express();

const dbURI =
  "mongodb+srv://ninj:dq3beK7QGFxCEcMu@cluster0.schqpii.mongodb.net/finalP?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(4001))
  .catch((err) => console.log(err));

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.json());

app.get("*", checkUser);
app.get("/", requireAuth, (req, res) => {
  res.render("index");
});

app.get("/schedule", requireAuth, (req, res) => {
  res.render("schedule");
});

app.get("/mySchedule", requireAuth, (req, res) => {
  res.render("/classes", { title: "My Schedule" });
});

app.use(blogRoutes);
app.use(authRoutes);

app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
