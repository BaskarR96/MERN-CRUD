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

// app.use(cors({
//     "origin": "https://mern-crud-frontend-five.vercel.app",
//     "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
//     "preflightContinue": false,
//     "optionsSuccessStatus": 200
// }))
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "https://mern-crud-frontend-five.vercel.app"); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
// app.options('*', cors());
 
// app.use("/public", express.static(path.join(__dirname, 'public')));
 
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // *.domain.com update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept","Content-disposition");
  res.header("Access-Control-Allow-Headers","Origin, X-Requeted-With, Content-Type, Accept,Content-disposition, Authorization, RBR");
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  if (req.method === "OPTIONS") { return res.status(200).end(); }
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandler);

app.get('/', (req, res) => res.send('Server is ready'));

app.listen(port, () => console.log(`Server is running on port ${port}`))
