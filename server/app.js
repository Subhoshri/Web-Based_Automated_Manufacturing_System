const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
];

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));
app.use(express.json());

const connectDB = require("./config/db");

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