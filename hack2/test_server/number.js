import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const CoolSchema = new Schema({
    number: String
})

const Cool = mongoose.model('Cool', CoolSchema)

module.exports = Cool