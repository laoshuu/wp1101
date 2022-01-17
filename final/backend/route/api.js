import express from 'express'
import Game from '../models/game.js'
import moment from 'moment'

const router = express.Router()

router.post('/api/save-game', async (req, res) => {
    try {
        const newGame = new Game({
            game: req.body.playerList,
            opponent: req.body.team,
            date: moment(new Date()).format("YYYY.MM.DD"),
            us: req.body.us,
            enemy: req.body.enemy
        })
        await newGame.save()
            .then(() => {
                res.send({ message: 'game saved' })
            })
    }
    catch (e) {
        res.send({ message: `${req.body}` })
    }
})

router.get('/api/get-game', async (req, res) => {
    await Game.find()
        .then((result) => { res.send({ message: result }); console.log(result) })
        .catch((e) => { console.log(e) })
})

router.post('/api/delete-game', async (req, res) => {
    await Game.deleteOne({ opponent: req.body.opponent })
        .then((result) => { res.send({ message: 'data deleted' }) })

        .catch((e) => { console.log(e) })
})

router.delete('/api/delete-allGame', async (req, res) => {
    await Game.deleteMany({})
        .then((result) => { res.send({ message: 'all data deleted' }) })

        .catch((e) => { console.log(e) })
})

export default router