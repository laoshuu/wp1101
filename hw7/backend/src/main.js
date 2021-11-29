import express from 'express'
import cors from 'cors'
import guessRoute from './routes/index'
import connection from './mongo'
import bodyParser from 'body-parser';
// import ScoreCard from './models/ScoreCard'


const app = express()


//connect to db
connection()
// init middleware
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
// define routes
app.use('/', guessRoute)
// define server
const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
})