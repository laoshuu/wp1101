import express from 'express'
import ScoreCard from '../models/ScoreCard'

const router = express.Router()

router.post('/api/create-card', async (req, res) => {

    const existing = await ScoreCard.findOne({ "name": `${req.body.name}`, "subject": `${req.body.subject}` })
    if (existing !== null) {
        try {
            await ScoreCard.updateOne({ "_id": existing._id }, { $set: { "score": `${req.body.score}` } })
                .then(() => {
                    res.send({ message: `Updating (${req.body.name}, ${req.body.subject}, ${req.body.score})`, card: true })
                })
        }
        catch (e) {
            throw new Error("Data updating error:" + e)
        }
    }
    else {
        try {
            const scoreCard = new ScoreCard({
                name: req.body.name,
                subject: req.body.subject,
                score: req.body.score
            })
            await scoreCard.save()
                .then(() => {
                    res.send({ message: `Adding (${req.body.name}, ${req.body.subject}, ${req.body.score})`, card: true })
                })
        }
        catch (e) {
            throw new Error("Data creation error:" + e)
        }
    }

})

router.get('/api/query-cards', async (req, res) => {
    if (req.query.type === "name") {
        const count = await ScoreCard.find({ "name": `${req.query.queryString}` }).count()
        const msg = []
        await ScoreCard.find({ "name": `${req.query.queryString}` })
            .then((result) => {
                for (let i = 0; i < count; i++) {
                    msg.push(`Found card with name: (${result[i].name}, ${result[i].subject}, ${result[i].score})`)
                }
                // console.log(count)
                if (count > 0)
                    res.send({ messages: msg })
                else
                    res.send({ message: `QueryType ${req.query.queryString} not found!` })

            })
            .catch((err) => { res.send({ message: `${err}` }) })
    }

    else {
        const count = await ScoreCard.find({ "subject": `${req.query.queryString}` }).count()
        const msg = []
        await ScoreCard.find({ "subject": `${req.query.queryString}` })
            .then((result) => {
                for (let i = 0; i < count; i++) {
                    msg.push(`Found card with subject: (${result[i].name}, ${result[i].subject}, ${result[i].score})`)
                }
                if (count > 0)
                    res.send({ messages: msg })
                else
                    res.send({ message: `${req.query.type} (${req.query.queryString}) not found!` })
            })
            .catch((err) => { res.send({ message: `${err}` }) })
    }
})


router.delete('/api/clear-db', async (req, res) => {
    await ScoreCard.deleteMany({})
        .then(() => { res.send({ message: 'Database cleared' }) })
        .catch((err) => {
            console.log(err)
        })

})

router.get('/hello', async (req, res) => {
    // const existing = await ScoreCard.find({ "subject": "math" }).c
    await ScoreCard.find({ "name": "Ryan" })
        .then((result) => { console.log(result) })
}

)

export default router;