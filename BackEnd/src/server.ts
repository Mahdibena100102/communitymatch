import express, { Request, Response, NextFunction } from "express";
import cors, { CorsOptions } from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import userRouter from "./routes/user";
import loginRouter from "./routes/login";
import logoutRouter from "./routes/logout";
import marriageProfileRouter from "./routes/marriage_profile";
import mosqueRouter from "./routes/mosque";
import interestRouter from "./routes/interest_expressed";
import matchRouter from "./routes/match";
import reportsRouter from "./routes/reports";
import passRouter from "./routes/pass";

dotenv.config();

const app = express();

const port: number = Number(process.env.API_PORT) || 8000;

app.use(cookieParser());
app.use(express.json());

const corsOptions: CorsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "OPTIONS", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
};

app.use(cors(corsOptions));

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`Request method: ${req.method}, URL: ${req.url}`);
  next();
});

app.use('/user', userRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/marriage-profile', marriageProfileRouter);
app.use('/mosque', mosqueRouter);
app.use('/interest', interestRouter);
app.use('/match', matchRouter);
app.use('/report', reportsRouter);
app.use('/pass', passRouter);

app.listen(port, () => {
  console.log(`API is running on port ${port}`);
});

