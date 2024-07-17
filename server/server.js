const express = require("express");
const path = require("path");
const cors = require("cors");

require('dotenv').config();  // to access the environment variales.

const connectDB = require("./config/dbConfig");
const userRouter = require("./routes/userRouter")
const movieRouter = require("./routes/movieRoute");
const theatreRouter = require("./routes/theatreRoute");
const showRouter = require("./routes/showRoute");
const bookingRouter = require("./routes/bookingRoute");

const app = express();
const clientBuildPath = path.join(__dirname, "../client/build");
console.log("clientBuildPath: ", clientBuildPath);

app.use(express.static(clientBuildPath));
app.get("*", (req, res) => {
    res.sendFile(path.join(clientBuildPath, "index.html"));
})

app.use(cors({
    orgin: "*", // Allow only frontend origin.
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

// app.use("/api/bookings/verify", express.raw({ type: "application/json" }));
app.use(express.json());

connectDB();


/** Routes */
app.use('/api/users', userRouter);
app.use("/api/movies", movieRouter);
app.use("/api/theatres", theatreRouter);
app.use("/api/shows", showRouter);
app.use("/api/bookings", bookingRouter);

app.use((req, res) => {
    res.status(404).json({ message: "Page not found" });
});

app.listen(8082, () => {
    console.log("Server is running on port 8082");
})