const express = require('express')//right click, 
const app = express()
const port = 3000

app.get('/', (req, res) => {//当看到/就发 Hi Goh
  res.send('Hi Goh')
})

app.get('/bye', (req, res) => {//当看到/bye就发 No Hi
    res.send('No Hi')
  })

//用一般的browser会404 
  app.post('/register', (req, res) => {// bcs browser 的address bar一般都是get 不能post（因为是address bar是拿data 是get 
    res.send('Goh Account Created Diu')
  })

  app.use(express.json())
  
  app.post('/login', (req, res) => { 
    console.log(req.body)

    res.send('Login')
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})//ctrl C to kill server