const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("DB Connected"))
.catch(err => console.log(err));

const connectDB = require("./config/db");

connectDB();

app.get("/", (req, res) => {
  res.send("WAMS Backend Running");
});

// Routes
app.use('/dealer', require('./routes/dealerRoutes'));
app.use('/product', require('./routes/productRoutes'));
app.use('/order', require('./routes/orderRoutes'));
app.use('/supplier', require('./routes/supplierRoutes'));
app.use('/quotation', require('./routes/quotationRoutes'));
app.use('/billing', require('./routes/billingRoutes'));

module.exports = app;