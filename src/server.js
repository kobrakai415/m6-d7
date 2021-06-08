import express from "express";

import studentsRoute from "./services/students/index.js";

import tutorsRoute from "./services/tutors/index.js";

const { PORT } = process.env;

const app = express();

app.use(express.json());

app.use("/students", studentsRoute);
app.use("/tutors", tutorsRoute);

app.listen(PORT, () => console.log("server is running on port ", PORT));

app.on("error", (err) => console.log("server is not running ", err));
