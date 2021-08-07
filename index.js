require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./routes/auth");
const path = require("path");

const app = express();

app.use(bodyParser.json());
app.use(cors());

//route
app.use("/api", routes);

if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

//port
const port = process.env.PORT || 8080;

app.listen(port, () => {
	console.log(`app is running at ${port}`);
});
