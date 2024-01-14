const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const cors = require('cors');

const authRoute = require('./routes/authRoutes');
const booksRoute = require('./routes/book');

require('dotenv').config();

app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());


app.use('/api/v1/auth', authRoute);
app.use('/api/v1/book', booksRoute);


app.get('/', async (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Your Server is up and running....."
    });
});

const port = process.env.PORT || 8080;

// console.log(process.env.PORT);
app.listen(port , ()=>{
    console.log("App is listening on port " , port);
})