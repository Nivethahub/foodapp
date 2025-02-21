import swaggerJSDoc from 'swagger-jsdoc';
import dotenv from "dotenv";
import path from 'path';

dotenv.config();
const swaggerPort = process.env.PORT || 5000;
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Backend Food_App',
            version: '1.0.0',
            description: 'API documentation for Backend Food_App',
            contact: {
                name: 'Backend Developer',
                email: 'nivetha@hexrfactory.com',
            },
        },
        servers: [
            {
                url: `http://localhost:${swaggerPort}/api/v1`,
                description: 'Local Development Server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./src/routes/*.js'], // Update as per your project structure
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
export default swaggerDocs;
