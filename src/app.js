import express from 'express';
import userRoutes from "./routes/userRoutes.js"
import categoryRoutes from "./routes/categoryRoutes.js"
import foodRoutes from "./routes/foodRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import restaurantRoutes from "./routes/restaurantRoutes.js"
import swaggerDocs from './swagger/swagger.js';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';


const app = express()
dotenv.config();

//swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//default route
app.get('/', (req, res) => {
    res.send("Welcome to FoodAPP");
})

//routes
app.use("/api/v1", userRoutes)
app.use("/api/v1/category", categoryRoutes)
app.use("/api/v1/food", foodRoutes)
app.use("/api/v1", authRoutes)
app.use("/api/v1/restaurant", restaurantRoutes)

export default app