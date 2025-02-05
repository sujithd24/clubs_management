const express = require('express')
const cors = require('cors')
const dev = require('dotenv').config()
const mongoose = require('mongoose')


const session = require('express-session'); 
const cookieParser = require('cookie-parser');

app = express()

app.use(cookieParser()); 
app.use(session({ 
    key: "users",
    secret: process.env.SS || "just", 
    resave: false, 
    saveUninitialized: true, 
    cookie: { 
        secure: true,
        maxAge: 60*60*1000
     }
    }));





app.use(cors({ 
    origin: 'http://localhost:3000', 
    credentials: true 
}))
app.use(express.json())


const Port  = process.env.Port || 5001

mongoose.connect(process.env.DB_URL).then(
    () => {
        console.log(`DB Connected`)
    }
) .catch(
    (e) => {
        console.log(e)
    }
)

const userRoutes = require('./routes/user')
const clubRoutes = require('./routes/clubs')
const fundRoutes = require('./routes/funds')
const societyRoutes = require('./routes/society')

app.use('/api/user', userRoutes)
app.use('/api/club', clubRoutes)
app.use('/api/fund', fundRoutes)
app.use('/api/society', societyRoutes)


app.listen(Port ,()=>{
    console.log(`server is running in the port ${Port}`);
})