require('dotenv').config();
const bodyParser=require('body-parser')
const express = require('express');
const { connectDB } = require('./config/db');
const { initModels } = require('./models');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');  
const sellerRoutes = require('./routes/sellerRoutes');  
const customerRoutes = require('./routes/customerRoutes');  
const bidRoutes = require('./routes/bidRoutes');  
const auctionRoutes = require('./routes/auctionRoutes');  





const app = express();
const { startCronJob } = require('./cron/winnerCron');

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' })); 
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true })); 
app.use(express.json());

connectDB();
initModels();
startCronJob();
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);  
app.use('/api/sellers', sellerRoutes);  
app.use('/api/customers', customerRoutes);
app.use('/api/bids', bidRoutes);
app.use('/api/auctions',auctionRoutes)



const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
