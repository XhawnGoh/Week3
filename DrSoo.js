let dbUsers = [
    {
        _id: 1,
        username: "soo",
        password: "123456",
        name: "Soo",
        email: "soo@utem.edu.my"
    },
    {
        _id: 2,
        username: "john",
        password: "password",
        name: "John",
        email: "john@utem.edu.my"
    },
    {
        username: "ali",
        password: "654321",
        name: "Ali",
        email: "ali@utem.edu.my"
    }
]

const express = require('express')
const app = express()
const port = 3000

const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://soo:zSoOe37Y9odehfZS@cluster0.jr4v4er.mongodb.net/?retryWrites=true&w=majority";
const uri = "mongodb://127.0.0.1:27017"
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri);

client.connect().then(res => {
    // console.log(res)
})

app.use(express.json())

app.post('/login', (req, res) => {
    console.log(req.body)

    let result = login(
        req.body.username,
        req.body.password
    )

    res.send(result)
})

app.post('/register', (req, res) => {
    let result = register(
        req.body.username,
        req.body.password,
        req.body.name,
        req.body.email
    )

    res.send(result)
})

app.get('/', (req, res) => {
    res.send('Hello UTeM!')
})

app.get('/Bye', (req, res) => {
    res.send('Bye Bye UTeM!')
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

async function login(reqUsername, reqPassword) {
    // let matchUser = dbUsers.find(
    //     x => x.username == reqUsername
    // )
    let matchUser = await client.db('benr2434')
        .collection('users')
        .findOne({ username: { $eq: reqUsername } })

    console.log(matchUser)

    if (!matchUser) return "User not found!"
    if (matchUser.password == reqPassword) {
        return matchUser
    } else {
        return "Invalid password"
    }


    // for(let i = 0; i < dbUsers.length; i++) {
    //     console.log(dbUsers[i])
    //     if(dbUsers[i].username == reqUsername)
    // }
}

function register(reqUsername, reqPassword, reqName, reqEmail) {
    client.db('benr2434').collection('users').insertOne({
        username: reqUsername,
        password: reqPassword,
        name: reqName,
        email: reqEmail
    })
    // dbUsers.push({
    //     username: reqUsername,
    //     password: reqPassword,
    //     name: reqName,
    //     email: reqEmail
    // })
}

// try to login
// console.log(login("soo", "123456"))
// console.log(login("utem", "password"))

// register("utem", "password", "fkekk", "fkekk@m.com")

// console.log(login("utem", "password"))