require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const Product = require("./routes/productRoutes");

const app = express();
app.use(express.json());
app.use(fileUpload());

app.use("/api/products", ProductRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("listening on port " + process.env.PORT);
    });
  })
  .catch((err) => {
    console.error(err);
  });
