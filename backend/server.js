const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const { errorHandler } = require('./Middleware/error.middleware');
const { connectDB } = require('./config/db');

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send("Hello World!");
})

// connecting to db
connectDB();

// parsing data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/posts", require("./Routes/posts.routes"));
app.use("/api/users", require("./Routes/user.routes"));

// Custom error handler
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));