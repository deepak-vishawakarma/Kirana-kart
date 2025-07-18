import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

//Routes
import ProductRoute from "./Routes/ProductRoute.js"
import CategoriesRoute from "./Routes/CategoriesRoute.js"
import CartRoute from "./Routes/CartRoute.js"

// import AdminUser
import AdminUserRoute from "./Routes/AdminUserRoute.js"

// User Route
import UserRoute from "./Routes/UserRoute.js"

// Order Route
import OrderRoutes from "./Routes/OrderRoute.js";

//Connect with Mongoodb
import ConnectDB from "./Config/ConnectDB.js"

const app = express();
const port = process.env.PORT;

app.use((cors()))
app.use(bodyParser.json());

ConnectDB()

//Product api
app.use("/api/product", ProductRoute);

// Store Api
app.use("/api/Categories", CategoriesRoute);

//Admin User 
app.use('/Admin/User',AdminUserRoute);

//Cart Api
app.use("/api/cart",CartRoute);

// User Route
app.use('/User',UserRoute);

// Order Route

app.use("/api/order", OrderRoutes);

app.use('/uploads', express.static('uploads'));

app.listen(port,()=>{
    console.log("Server is ready ")
})