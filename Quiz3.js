const express = require('express')//right click, 
const app = express()
const port = 3000

const jwt = require('jsonwebtoken');

app.use(express.json())// NO1 (app use 要放在第一个)


app.get('/', (req, res) => {//当看到/就发 Hi Goh
  res.send('Hi Goh')
})

/*app.post('/register', (req, res) => {
  let data = req.body
  res.send(
      register(
      data.newusername,
      data.newpassword,
      data.newname,
      data.newemail
      )

  );
});*/

app.get('/bye', verifyToken, (req, res) => {//当看到/bye就发 No Hi
    res.send('No Hi')
  })

//用一般的browser会404 
  app.post('/register', (req, res) => {// bcs browser 的address bar一般都是get 不能post（因为是address bar是拿data 是get 
    
    let result = register (req.body.username,
       req.body.password, 
       req.body.name, 
       req.body.email)

    res.send(result)// press send request at  file.http to simulate

  })

function generateToken(userData){
  const token = jwt.sign(
    userData,
    'inipassword',
    { expiresIn: 1000 }//token will expire in 1000 sec
  );
  return token
}

function verifyToken(req,res,next){
    let header = req.headers.authorization
    console.log(header)

    let token = header.split(' ')[1]

    jwt.verify(token,'inipassword',function(err,decoded){
      if(err){
        res.send("Invalid Token")
      }

      req.user = decoded
      next()
    });
}
  
  app.post('/login', (req, res) => { 
    console.log(req.body)

    let result = login(req.body.username, req.body.password)

    let token = generateToken(result)
    res.send(token)

  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})//ctrl C to kill server

function login(requsername,reqpassword){// req是input的data
  //=> 是进去array的element 会存在箭头前面 的意思(类似function？)
let matchUser = dbUser.find(user => user.username == requsername)//让系统找有没有一样的username //就是在dbUser里面一个一个找
//array //find (什么东西)       
//console.log(matchUser)

if (!matchUser)return"User not Found!"
if (matchUser.password == reqpassword){
return matchUser
}else{
return"Invalid Password"
}
}


function register(requsername,reqpassword,reqname,reqemail){//增加新data
  dbUser.push({
      username: requsername,
      password: reqpassword,
      name: reqname,
      email: reqemail
  })
}

/*function register(newusername, newpassword, newname, newemail) {
  //TODO: Check if username exist

  let regmatch = dbUser.find(element =>
      element.username == newusername
      )
      if (regmatch) {
          return "Username is used"
      } else {

      dbUser.push({
          username: newusername,
          password: newpassword,
          name: newname,
          email: newemail,
      })
      return "Registration success"
  }
}*/

let dbUser =[//一个叫dbUser 的array
    {
        username: "Soo",
        password: "123456",
        name: "You Guan",
        email: "SooYouGuan@gamil.com"
    },
    {
        username: "Goh",
        password: "123456",
        name: "Jia Xuen",
        email: "gohjiaxuen@gamil.com"
    },
    {
        username: "Xhawn",
        password: "666666",
        name: "niupay",
        email: "Xhawngaming@gamil.com"
    },
]
