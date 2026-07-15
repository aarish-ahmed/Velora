import cookieParser from "cookie-parser";
import express from 'express'
import cors from 'cors'
import appRoutes from "./routes/appRoutes.js";
import userRoutes from "./routes/userRoutes.js";
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials:true,
  })
);
''
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/user", userRoutes);
app.use("/app", appRoutes);

export default app;
