import express from 'express'
import Cool from './number'

const router = express.Router()

router.post('/save', async (req, res) => {
    const number = new Cool({
        number: req.body.number
    })
    number.save()
        .then(() => { return { msg: 'Saved' } })
        .catch((e) => { console.log(e) })
})



export default router