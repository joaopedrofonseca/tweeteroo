import express from "express"
import cors from "cors"

const app = express()
app.use(express.json())
app.use(cors())
const PORT = 5000

app.listen(PORT, () => { 
    console.log(`Porta do servidor: ${PORT}`)
})

let users = []
let tweets = []

app.post("/sign-up", (req,res) => {
    let user = req.body
    users.push(user)
    res.send("OK")
})

app.post("/tweets", (req, res) => { 
    let tweetWritten = req.body
    let image = users.find(e => e.username === tweetWritten.username)
    if(!users.includes(tweetWritten.username)){
        res.send("UNAUTHORIZED")
    } else{
        res.send('OK')
        let tweetGet = {username: tweetWritten.username, avatar: image.avatar, tweet: tweetWritten.tweet}
        tweets.push(tweetGet)
    }
})

app.get("/tweets", (req, res) => {  
    if (tweets.length < 10){
        res.send(tweets)
    } else{
        let tenTweets = tweets.filter((e, i) => i < 10)
        res.send(tenTweets)
    }
})