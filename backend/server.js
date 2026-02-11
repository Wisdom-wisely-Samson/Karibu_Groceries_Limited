const express = require("express");
require("./config/db");

const app = express();
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/produce", require("./routes/produceRoutes"));
app.use("/api/sales", require("./routes/salesRoutes"));
app.use("/api/reports", require("./routes/reportRoutes"));

app.listen(5000, () => console.log("Server running on port 5000"));
