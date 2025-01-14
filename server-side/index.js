/**
 * @file index.js
 * @fileoverview Main server file for the CodeHub.
 *              -Sets up the Express server, database, middleware, routes, and error handling.
 */
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const session = require("express-session");
const connectDB = require("./db/connect");

const clientRoutes = require("./routes/clientRoutes");
const errorHandler = require("./ErrorHandlers/error_handler");

const app = express();
require("dotenv").config();

/*------------------- Middlewares------------------- */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("📋[server-log]: :method :url :status :response-time ms"));//logs details about each incoming HTTP request.
app.use(cookieParser());

// List of allowed origins for CORS
const allowedOrigins = [
    "https://computercodingclub.in",
    "http://localhost:3000",
];

//Enable cross-origin resource sharing(CORS) for list of allowed origins.
app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
    })
);

//to store user information.
app.use(
    session({
        secret: "secret",
        resave: false, //prevent save if not modified. 
        saveUninitialized: true,
        cookie: {
            httpOnly: true,//the cookie is only accessible via HTTP(S) and not by client-side JavaScript.
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 24 * 60 * 60 * 1000, // cookie expires in 24 hours.
        },
    })
);

// Connect to the database
connectDB();

// Routes
// app.use("/admin", adminRoutes);
app.use("/", clientRoutes);

//error handler middleware(Custom).
app.use(errorHandler);

// Start the server
const server = app.listen(process.env.PORT, () =>
    console.log(`Server started on port ${process.env.PORT}`)
);

// Handle uncaught exceptions.
process.on("uncaughtException", (err) => {
    console.error(`Error: ${err.message}`);
    console.error("Shutting down due to uncaught exception");
    server.close(() => process.exit(1));
});

// Handle unhandled promise rejections.
process.on("unhandledRejection", (err) => {
    console.error(`Error: ${err.message}`);
    console.error("Shutting down due to unhandled promise rejection");
    server.close(() => process.exit(1));
});
