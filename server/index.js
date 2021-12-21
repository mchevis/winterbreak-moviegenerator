const express = require("express");
const app = express();
const path = require("path");
const db = require("./db");

//body parsing middleware
app.use(express.json());

app.use("/dist", express.static(path.join(__dirname, "..", "dist")));

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "..", "index.html"))
);

app.use("/api", require("./api"));

const PORT = process.env.PORT || 3000;

const init = async () => {
  await db.syncAndSeed();
  app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
};

init();
