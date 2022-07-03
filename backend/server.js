const path = require('path')
const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const { errorHandler } = require('./Middleware/error.middleware');
const { connectDB } = require('./config/db');

const PORT = process.env.PORT || 5000;

// connecting to db
connectDB();

// parsing data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/posts", require("./Routes/posts.routes"));
app.use("/api/users", require("./Routes/user.routes"));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')));

    app.get('*', (req, res) =>
        res.sendFile(
            path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
        )
    )
}

// Custom error handler
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));