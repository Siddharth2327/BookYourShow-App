const express = require('express');
const app = express();
const dbconfig = require('./config/dbconfig')

app.listen('8000', ()=>{
    console.log('server started on port 8000')
})