import express from "express"
import cors from "cors"

const app = express()
app.use(express.json())
app.use(cors())
const PORT = 5000

app.listen(PORT, () => {
    console.log(`Porta do servidor: ${PORT}`)
})

let users = [
    {
        username: "jp",
        avatar: "imagem"
    }
]
let tweets = []

app.post("/sign-up", (req, res) => {
    let user = req.body
    let u = req.body.username
    let a = req.body.avatar
    if (!u || !a) {
        res.sendStatus(401)
    } else {
        users.push(user)
        res.status(201).send(users)
    }
})

app.post("/tweets", (req, res) => {
    const tweet = req.body
    let filteredUser = users.filter(user => tweet.username === user.username)
    if (filteredUser[0]){
        let newTweet = {
            username: tweet.username,
            avatar: filteredUser[0].avatar,
            tweet: tweet.tweet
        }
        tweets.push(newTweet)
        res.status(201).send(tweets)
    } else{
        res.sendStatus(401)
    }
    console.log(filteredUser)
})

app.get("/tweets", (req, res) => {
    const tweetsNumber = 10
    const lastTweets = tweets.slice(-tweetsNumber).reverse()
    res.send(lastTweets)
})