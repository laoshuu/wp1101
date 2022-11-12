import express from 'express'
import cors from 'cors'
import router from './routes/saveRoutes'
import connection from './mongo'
import bodyParser from 'body-parser';


const app = express()


//connect to db
connection()
// init middleware
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
// define routes
app.use('/', router)
// define server
const port = process.env.PORT || 4000
app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
})