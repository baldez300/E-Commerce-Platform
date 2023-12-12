require("dotenv").config();
const express = require("express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const userRoutes = require("./routes/user");
const productRouters = require("./routes/products");
const orderRouters = require("./routes/orders");
const cors = require("cors");
const customMiddleware = require("./middleware/customMiddleware");
const swagger_options = require("./utils/swaggerOptions");
const connectDB = require("./config/db");

// App
const app = express();
const port = process.env.PORT || 4000;
const swaggerDocs = swaggerJsDoc(swagger_options);
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(customMiddleware.requestLogger);

// Routes
app.use("/api/user", userRoutes);

app.use("/products", productRouters);

app.use("/api/orders", orderRouters);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(customMiddleware.unknownEndpoint);

app.use(customMiddleware.errorHandler);

app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
);
