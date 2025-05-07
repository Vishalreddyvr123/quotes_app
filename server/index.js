const express = require("express");
const app = express();
const userRouter = require("./routes/user");
const quoteRouter = require("./routes/quote");
const { jwtAuth } = require("./utils/jwtauth");

const cors = require("cors");
app.use(cors());

app.use(express.json());

app.use("/users", userRouter);
app.use("/books", quoteRouter);

const port = 3000;
app.listen(port, "0.0.0.0", () => {
	console.log("server ready at port", port);
});