var express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Pokemons = require('../models/pokemons');

const pokemonRouter = express.Router();
pokemonRouter.use(bodyParser.json());

// First End point : simple requests receives and sends without interaction with DATABASE ! 

pokemonRouter.route('/')
   .all((req,res,next)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        next();
        })
   .get((req,res,next)=>{
        res.end('I will send you all my pokemons !!');
        })
   .post((req,res,next)=>{
        res.end('I will add to my list the pokemon with the name : '+req.body.name+' with the type : '+req.body.poType + ", Defense power"+req.body.defense +" Offense power"+ req.body.offense);
        })
   .put((req,res,next)=>{
        res.statusCode=403;
        res.end("This operation is not allowed on /pokemon");
        })
    .delete((req,res,next)=>{
        res.end("we are going to delete all the pokemons in my list (dangerous operation) ");
        });


// third End point : use of mongoose

pokemonRouter.route('/api/')
    .all((req,res,next)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        next();
        })
    .get((req,res,next)=>{
    Pokemons.find({}).then((my_pok)=>{
        res.status.code=200;
        res.setHeader('Content-Type','application/json');
        res.json(my_pok);
        },(err)=>next(err))
    .catch((err)=>next(err));
    })
    .post((req,res,next)=>{
    Pokemons.create(req.body).then((pok)=>{
        console.log('a new pokemon has been recorded',res);
        res.status = 200;
        res.setHeader('Content-Type','application/json');
        res.json({success:'success!'});
        },(err)=>next(err))
        .catch((err)=>next(err));
        });

           



module.exports = pokemonRouter;