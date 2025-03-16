import swaggerUi from "swagger-ui-express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Convert __dirname for ES Module support
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const swaggerFilePath = path.join(__dirname, "../swagger.json");

const setupSwagger = (app) => {
    if (!fs.existsSync(swaggerFilePath)) {
        console.error("⚠️  Swagger JSON file not found at:", swaggerFilePath);
        return;
    }

    const swaggerDocument = JSON.parse(fs.readFileSync(swaggerFilePath, "utf8"));
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};

export default setupSwagger; 