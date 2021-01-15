const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: '',
        database: 'SeeFood'
    }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

const database = {
    users: [
        {id: '123',
        name:'John',
        email:'john@gmail.com',
        password:'cookies',
        entries: 0,
        joined: new Date()},
        {id: '155',
        name:'Sally',
        email:'sally@gmail.com',
        password:'cookies',
        entries: 0,
        joined: new Date()},
    ]
}

app.get('/',(req,res) => {
    res.send(database.users)
})

app.post('/signin',(req,res) => {
    bcrypt.compare("bacon", hash, function(err, res) {
    // res == true
    });
    bcrypt.compare("veggies", hash, function(err, res) {
        // res = false
    });
    if (req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password){
        res.json('success');
    } else{
        res.status(400).json('error logging in')
    }
})

app.post('/signup',(req,res) => {
    const {email, name, password} = req.body;
    db('users')
        .returning()
        .insert({
            email: email,
            name: name,
            joined: new Date()
        })
        .then(user => {
            res.json(user)
        })
        .catch(err => res.status(400).json('oops, err'))
})

app.get('/profile/:id',(req,res)=>{
    const {id} = req.params;
    db.select('*').from('users').where({id:id})
        .then(user=>res.json(user[0]))
})

app.put('/image',(req,res) => {
    const {id} = req.body;
    db('users').where('id','=',id)
        .increment('entries',1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(err => res.status(400).json('sth wrong with the entries'))
})

app.listen(3000, () => {
    console.log('app is running');
})