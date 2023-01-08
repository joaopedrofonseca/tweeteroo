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
    /*{
        username: "jp",
        avatar: "imagem"
    }*/
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
    if (filteredUser){
        tweet.avatar = filteredUser.avatar
        tweets.push(tweet)
        res.sendStatus(201)
    } else {
        res.status(401).send("UNAUTHORIZED")
    }
})

app.get("/tweets", (req, res) => {
    res.send(tweets)
})