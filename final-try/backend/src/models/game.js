import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const GameSchema = new Schema({
    game: Array,
    opponent: String,
    date: String,
    us: Number,
    enemy: Number,

    //FGM, FGA, 3PM, 3PA, FTM, FTA, TO, AST, REB, ST, BLK, PF, PTS
})

const Game = mongoose.model('Games', GameSchema)

module.exports = Game