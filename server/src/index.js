const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./config/db");

// connecting with pg:
db.authenticate()
  .then(() => {
    console.log("Database up and running");
  })
  .catch((error) => console.error(error.message));

// middleware:
app.use(express.json()); // req.body
app.use(cors());

// ROUTES:
app.use("/user", require("./routes/user"));

db.sync();

const PORT = process.env.PORT | 5000;
app.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}`);
});
