const express=require('express');
const http=require('http')

const { v4: uuidV4 } = require('uuid')
const app=express()
const bodyParser=require('body-parser')
const mongoose=require('mongoose')
const cors=require('cors');
const { Socket } = require('dgram');
const userRouter=require('./userController');
app.use(express.static('./'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://pataranAdmin:WtrlCAzO2qr0HnSv@cluster0.scpvd.mongodb.net/webrtcNew?retryWrites=true&w=majority',{useNewUrlParser: true})


db=mongoose.connection;
if(db)
{
    console.log("db Connection established");
}



const server=http.createServer(app);


app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
    });

const port=process.env.PORT || 5000;

app.use(cors({
    origin: '*'
  }));

app.use("/user",userRouter);




server.listen(port,()=>{


    console.log("Server is listening at :"+port);
})