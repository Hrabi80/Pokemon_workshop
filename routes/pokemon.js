var express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Pokemons = require('../models/pokemons');

const pokemonRouter = express.Router();
pokemonRouter.use(bodyParser.json());

pokemonRouter.route('/')
.all((req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
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

    pokemonRouter.route('/ajouter/')
        .post((req,res,next)=>{
        Pokemons.create(req.body)
            .then((res)=>{
                console.log('a new pokemon has been recorded',res);
                res.status = 200;
                res.setHeader('Content-Type','application/json');
                res.json({success:'success!'});
                },(err)=>next(err))
                .catch((err)=>next(err));
                });

pokemonRouter.route('/:pokemonId')
    .get((req,res,next)=>{
    res.end('We are going to send the pkemon with id : '+ req.params.pokemonId);
    })
    .post((req,res,next)=>{
    res.statusCode = 403;
    res.end('POST operation is not supported on pokemon/:'+req.params.pokemonId);
    })
    .put((req,res,next)=>{
    res.write('updating the pokemon with the id '+req.params.pokemonId + '\n');
    res.end('we will update the pokemon: '+ req.body.name + ' with defense power: '+req.body.defense);
    })
    .delete((req,res,next)=>{
    res.end('Delete the pokemon with the id : '+ req.params.pokemonId);
    });









pokemonRouter.route('/api/')
.get((req,res,next)=>{
Pokemons.find({})
.then((my_pok)=>{
res.status.code=200;
res.setHeader('Content-Type','application/json');
res.json(my_pok);
},(err)=>next(err))
.catch((err)=>next(err));
})


module.exports = pokemonRouter;