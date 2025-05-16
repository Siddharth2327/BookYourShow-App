const express = require('express');
const app = express();
const dbconfig = require('./config/dbconfig');
const userRoute = require('./routes/userRoute');
const userModel = require('./routes/moviesRoute');

const cors = require('cors');
app.use(cors({origin:'*'})) // allow all origins and make sure the cors middleware is used above all the routes

app.use(express.json());

app.use('/api/users', userRoute);
app.use('/api/movies', userModel);


app.listen('8000', ()=>{
    console.log('server started on port 8000')
})
