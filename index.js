const express = require('express');
const mongoose = require('mongoose');
const cors = require ('cors');

// routes
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes')

const app = express();

// connect to mongoDB database
mongoose.connect('mongodb+srv://admin:admin@zuitt-bootcamp.kc9re.mongodb.net/Capstone2?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.once('open', () => console.log('Now connected to MongoDB Atlas'))

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.listen(process.env.PORT || 4000, () => {
    console.log(`API is now online on port ${process.env.PORT || 4000}`);
});