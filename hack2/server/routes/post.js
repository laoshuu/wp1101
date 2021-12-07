import express from 'express'
import Post from '../models/post'
import moment from 'moment'

const router = express.Router()

// TODO 2-(1): create the 1st API (/api/allPosts)
router.get('/allPosts', async (req, res) => {
    try {
        const data = []
        const count = await Post.find().count()
        const posts = await Post.find().sort({ "timestamp": -1 })
        for (let i = 0; i < count; i++) {
            data.push(posts[i])
        }
        res.status(200).send({ data: data, message: "success" })
    }
    catch (e) { res.status(403).send({ data: null, message: "error" }) }

})
// TODO 3-(1): create the 2nd API (/api/postDetail)

// TODO 4-(1): create the 3rd API (/api/newPost)
router.post('/newPost', async (req, res) => {
    const post = new Post({
        postId: req.body.postId,
        title: req.body.title,
        content: req.body.content,
        timestamp: req.body.timestamp
    })
    console.log(req.body)
    try {
        post.save()
        res.status(200).send({ message: "Success" })
    }
    catch {
        res.status(403).send({ message: "error", data: null })
    }
})



// TODO 5-(1): create the 4th API (/api/post)

export default router