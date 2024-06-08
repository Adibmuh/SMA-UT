require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const studentRouter = require("./routes/students");

const app = express();
const port = process.env.PORT;

app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});
app.use("/api/students", studentRouter);

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(port, () => {
            console.log("Listening on port : ", port);
        });
        console.log("Successfully Connected");
    })
    .catch((error) => {
        console.log(error);
    });
