const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const options = require("./backend/config/swagger");

dotenv.config();
require("./backend/config/db");

const app = express();
const PORT = process.env.PORT || 5000;

//  GLOBAL MIDDLEWARE 
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// 2. SWAGGER SETUP
try {
    const swaggerSpec = swaggerJsDoc(options);
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
} catch (err) {
    console.error("Swagger setup failed. Check your YAML indentation in route files!", err.message);
}

// 3. ROUTES
app.use("/api/auth", require("./backend/routes/authroutes"));
app.use("/api/produce", require("./backend/routes/produceRoutes"));
app.use("/api/sales", require("./backend/routes/salesRoutes"));
app.use("/api/reports", require("./backend/routes/reportRoutes"));
app.use("/api/credit-sales", require("./backend/routes/creditRoutes"));
app.use("/api/dashboard", require("./backend/routes/dashboardRoutes"));

// 4. ERROR HANDLING MIDDLEWARE
const errorHandler = require("./backend/middleware/errorMiddleware");
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
