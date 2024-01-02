import express from 'express';
const app = express();
import dotenv from "dotenv";
dotenv.config();
import userRoutes from './routes/userRoutes.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import cors from 'cors';

connectDB();

const port = process.env.PORT || 5000;

app.use(cors({
    "origin": "https://www.mern-crud-frontend-five.vercel.app",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 200
}))
// app.options('*', cors());
 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandler);

app.get('/', (req, res) => res.send('Server is ready'));

app.listen(port, () => console.log(`Server is running on port ${port}`))
