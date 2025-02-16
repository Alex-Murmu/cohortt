const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require('cors')
const port = 2000;
const app = express();
app.use(express.json());
app.use(cors())

const jwtsecret = "12365";

const ALL_USER = [
  {
    username: "Alex@gmail.com",
    password: "123",
    name: "Alex Murmiu",
  },
  {
    username: "Anuraj@gmail.com",
    password: "12345",
    name: "Anuraj Marandi",
  },
  {
    username: "Ajay@gmail.com",
    password: "12352",
    name: "Ajay Hembram",
  },
];



function userExist(username, password) {
  for (let i = 0; i < ALL_USER.length; i++) {
    if (username === ALL_USER[i]["username"] && password === ALL_USER[i]["password"]) {
      return true;
    }
  }
  return false;
}

app.post('/login',(req,res)=>{
  const {username,password} = req.body;
  if(userExist(username,password)){
    const token = jwt.sign({username,password},jwtsecret,{expiresIn:'2h'});
    res.status(200).json({
      meassge:"user Exist",
      token
    })
  }
  else{
    res.status(404).json("user Not found")
  }
})

app.get('/getuserData',(req,res)=>{
  const token = req.headers.authorization;
  const decode = jwt.verify(token,jwtsecret);
  const username = decode.username;
  if(decode){
    res.status(200).json({
      user:ALL_USER.filter((user)=>{
        if(user.username ==username ){
          return false
        }
        else{
          return true;
        }
      })
    })
  }
  else{
    res.json(err.meassge)
  }
})

app.listen(port, () => {
  console.log("Server is running on port ", port);
});
 