import express from 'express'
const app = express()
import dotenv from "dotenv"
import { connectDatabase } from './config/dbConnect.js';
import errorsMiddleware from './middlewares/errors.js';



// Handle Uncaught Exeptions
process.on('uncaughtException' ,(err) => {
    console.log(`ERROR : ${err}`);
    console.log('Shutting down due to Uncaught exeption');
    process.exit(1)
})

// dotenv Config
dotenv.config({ path : 'backend/config/config.env'});

//Connecting to Database

connectDatabase()

// meddleware
app.use(express.json())


// import all routes
import productRoutes from "./routes/products.js"


app.use("/api/v1/" , productRoutes)

app.use(errorsMiddleware)





const server = app.listen(process.env.PORT , () => {
    console.log(`Server started on PORT: ${process.env.PORT} IN ${process.env.NODE_ENV} mode`)
})


// handle unhadled Promise rejection
process.on('unhandledRejection' , (err) => {
    console.log(`ERROR ${err}`)
    console.log('Shutting down server due to Unhandled Promise Rejection')
    server.close(() => {
        process.exit(1)
    })
})


// 