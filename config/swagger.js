import swaggerUi from "swagger-ui-express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerFilePath = path.join(__dirname, "../swagger.json");

function setupSwagger(app) {
    if (!fs.existsSync(swaggerFilePath)) {
        console.error("⚠️  Swagger JSON file not found at:", swaggerFilePath);
        return;
    }

    const swaggerDocument = JSON.parse(fs.readFileSync(swaggerFilePath, "utf8"));
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

export default setupSwagger;