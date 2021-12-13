import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    name: String,
    body: String,
})

const Message = mongoose.model('Message', MessageSchema)

module.exports = Message