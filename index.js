// code away!
const express = require("express");

// middleware
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");

// routes
const userRoutes = require("./routes/userRoutes");
const postsRoutes = require("./routes/postsRoutes");

const server = express();

server.use(bodyParser.json());
server.use(cors());
server.use(helmet());
server.use(morgan("dev"));

server.get("/", (req, res) => res.send("<h1>WebApi III</h1>"));
server.use("/api/users", userRoutes);
server.use("/api/posts", postsRoutes);

const port = process.env.PORT || 6500;

server.listen(port, () => console.log(`Server running on port ${port}`));
