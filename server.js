
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const knex = require('knex')({
    client: 'pg',
    connection:{
        host: '127.0.0.1',
        user: 'postgres',
        password: 'xfgti6$1',
        database: 'smartbrain'
    }
}); 


const app = express();
// app.use(bodyParser.json());
// app.use(cors())

app.use(express.urlencoded({extended: false}));
app.use(express.json());


app.get('/', (req, res) =>{
   // res.send(database.users);
    res.send('Homepage');
})

//Sign in 
app.post('/signin', (req, res) => { signin.handleSignin(req, res, knex, bcrypt)})

app.post('/register',(req, res) => { register.handleRegister(req,res,knex, bcrypt)})

app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, knex)})

app.put('/image', (req, res) => {image.handleImage(req, res, knex)})

app.post('/imageurl', (req, res) => {image.handleAPICall(req, res)})



app.listen(3000, ()=> {
    console.log("app is running on 3000 port");
})

