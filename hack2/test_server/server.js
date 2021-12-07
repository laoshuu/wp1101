import express from 'express'
import cors from 'cors'
import guessRoute from './router'
import bodyParser from 'body-parser';

import mongoose from 'mongoose'
import dotenv from 'dotenv'


const app = express()


//connect to db
dotenv.config()
mongoose.connect(process.env.MONGO_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((res) => console.log("mongo db connection created!"))
    .catch((err) => console.log(err))
// init middleware
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
// define routes
app.use('/', guessRoute)
// define server
const port = process.env.PORT || 4000
app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
})