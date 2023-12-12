const swaggerOptions = {
  definition: {
    openapi: "3.0.3", // Add this line
    info: {
      title: "Ecommerce API",
      description:
        "This API is a robust and efficient CRUD application built using Express.js. It provides endpoints for creating, reading, updating, and deleting data. The API is fully documented using Swagger, making it easy to understand and use. The documentation includes detailed information about each endpoint, the data structures used, and example responses.",
      contact: {
        name: "Group 8",
      },
    },
    servers: [
      {
        url: "http://localhost:4000", // Make sure this is an object with a url property
      },
    ],
  },
  apis: ["./routes/*.js", "./models/**/*.js"],
};

module.exports = swaggerOptions;
