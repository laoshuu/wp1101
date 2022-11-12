import mongoose from 'mongoose'
import dotenv from 'dotenv-defaults'

const connection = () => {
    dotenv.config();
    mongoose.connect(process.env.MONGO_URL,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then((res) => console.log("mongo db connection created!"))
        .catch((err) => console.log(err))
}

export default connection;