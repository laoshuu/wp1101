import express from 'express'
import { genNumber, getNumber } from '../core/number'

const roughScale = (x, base) => {
    const parsed = parseInt(x, base);
    if (isNaN(parsed)) { return 0; }
    return parsed;
}

const router = express.Router()
router.post('/start', (_, res) => {
    console.log(genNumber())
    res.json({ msg: 'The game has started.' })
})

router.get('/guess', (req, res) => {
    const number = getNumber()
    const guessed = roughScale(req.query.number, 10)
    if (!guessed || guessed < 1 || guessed > 100) {
        res.status(406).send({ msg: 'Not a legal number.' })
    }
    else if (number === guessed) {
        res.send({ msg: 'Equal' })
    }
    else {
        (guessed > number) ? res.send({ msg: 'Smaller' }) : res.send({ msg: 'Bigger' })
    }
})

router.post('/restart', (_, res) => {
    console.log(genNumber())
    res.json({ msg: 'Restart the game' })
})

export default router;