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
    if(!users.includes(tweetWritten.username)){
        res.send("UNAUTHORIZED")
    } else{
        res.send('OK')
    }
})