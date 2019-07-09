
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors())

const database ={
    users:[
        {
            id: '123',
            name: 'John',
            email: 'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Sally',
            email: 'sally@gmail.com',
            password: 'thep',
            entries: 0,
            joined: new Date()
        }
    ],
    login:[
        {
            id: '433',
            hash:'',
            email: 'john@gmail.com'
        }
    ]
}

app.get('/', (req, res) =>{
    res.send(database.users);
})

//Sign in 
app.post('/signin', (req, res) =>{
    // bcrypt.compare("apples", '$2a$10$aPBHvbVuPvOvsO0vRNl8NuzcLOOF2t0A1SgYEd1BjPYl81dGaX17m', function(err, res){
    //     //res == true
    //     console.log("First guess", res);
    // })

    // bcrypt.compare("veggies", '$2a$10$aPBHvbVuPvOvsO0vRNl8NuzcLOOF2t0A1SgYEd1BjPYl81dGaX17m', function(err, res){
    //     //res = false
    //     console.log("Second guess", res);
    // })

    if(req.body.email === database.users[0].email && 
        req.body.password === database.users[0].password){
            res.json(database.user[0]);
        }else{
            res.status(400).json('error logging in');
            
        }
})


app.post('/register', (req, res) =>{
   const { email, name, password} = req.body;
   bcrypt.hash(password, null, null, function(err, hash){
     console.log(hash);
   })

    database.users.push({
        id: '125',
        name: name,
        email: email,
        entries: 0,
        joined: new Date()
    })

    res.json(database.users[database.users.length-1]);

})

app.get('/profile/:id', (req, res)=>{
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
        if(user.id === id){
            found = true;
            res.json(user);
            } 
        
    })
    if(!found){
        res.status(400).json('not found');
    }
})

app.put('/image', (req, res) =>{
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        if(user.id === id){
            found = true;
            user.entries++;
            return res.json(user.entries);
        }
    })
    if(!found){
        res.status(400).json('not found');
    }
})



// bcrypt.hash("bacon", null, null, function(err, hash){
//     //Store hash in your password DB.
// });

//Load hash from your password DB
// bcrypt.compare("bacon", hash, function(err, res){
//     //res ==true
// });

// bcrypt.compare("veggies", hash, function(err, res){
//     //res == false
// });

app.listen(3000, ()=> {
    console.log("app is running on 3000 port");
})

/*
    --> res = this is working
    /signin --> POST  = success/fail
    /register --> POST = user
    /profile/:userId --> GET = user
    /image --> PUT --> user

*/