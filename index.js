import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { port, env } from "./src/config/app.js";
import apiRouter from "./src/routes/index.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Say hello
app.get("/", (req, res) =>
    res.status(200).json({ message: "Welcome to the base project!" }),
);

// Routes
app.use("/api/v1", apiRouter);

app.listen(port, () => {
    console.log(`Running on port ${port} in ${env} mode.`);
});
