const express = require('express');
const app = express();
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const path = require('path');
const PORT = process.env.PORT||4000
const cors = require('cors')
const User = require('./models/user');
const ejs = require('ejs');
const methodoverride = require('method-override');

//routes
const userRoutes = require('./routers/user')
const foodRoutes = require('./routers/food')
//for ejs templet
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded({extended:true}));
app.use(methodoverride('_method'))
app.use(express.static(path.join(__dirname,'public')));


//session config
const session = require('express-session');
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        // secure: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
        //cookie will expire in 7 days
    }
  }))


//load config
dotenv.config({path: './config/config.env'})
//connecting to database
connectDB()

//common middleware
app.use(cors());
app.use(express.json());

//routes
app.get('/',async(req,res)=>{
    const user = await User.findById(req.session.userId);
    res.send(`${user}`)
})
app.use('/user',userRoutes)
app.use('/food',foodRoutes)
app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`)
})