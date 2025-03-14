const swaggerUi = require("swagger-ui-express");
const fs = require("fs");
const path = require("path");

const swaggerFilePath = path.join(__dirname, "../swagger.json");

function setupSwagger(app) {
    if (!fs.existsSync(swaggerFilePath)) {
        console.error("⚠️  Swagger JSON file not found at:", swaggerFilePath);
        return;
    }

    const swaggerDocument = JSON.parse(fs.readFileSync(swaggerFilePath, "utf8"));
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

module.exports = setupSwagger;
