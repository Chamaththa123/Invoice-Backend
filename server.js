const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const db = require("./db/db");
const app = express();
const port = 8000;


const corsOptions = {
  // origin: "https://www.supershinecarcare.lk",
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());


app.use("/api/user",require("./routes/authRoutes"));
app.use("/api/customer",require("./routes/customerRoute"));


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
