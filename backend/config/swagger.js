// backend/config/swagger.js
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Karibu Groceries LTD API",
      version: "1.0.0",
      description: "Stock, Sales and Credit Management API",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            username: { type: "string" },
            role: { type: "string" },
            branch: { type: "string" },
          },
        },
        Produce: {
          type: "object",
          properties: {
            name: { type: "string" },
            tonnage: { type: "number" },
            branch: { type: "string" },
          },
        },
        Sale: {
          type: "object",
          properties: {
            buyerName: { type: "string" },
            produce: { type: "string" },
            tonnage: { type: "number" },
            amountPaid: { type: "number" },
            branch: { type: "string" },
          },
        },
        CreditSale: {
          type: "object",
          properties: {
            buyerName: { type: "string" },
            produce: { type: "string" },
            tonnage: { type: "number" },
            amountDue: { type: "number" },
            amountPaid: { type: "number" },
            dueDate: { type: "string", format: "date" },
            status: { type: "string" },
          },
        },
      },
    },
  },
  apis: ["./backend/routes/*.js"],
  
};

module.exports = options;
