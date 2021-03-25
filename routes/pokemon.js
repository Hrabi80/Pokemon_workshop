var express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Pokemons = require('../models/pokemons');

const pokemonRouter = express.Router();
pokemonRouter.use(bodyParser.json());



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
        res.json(  {success:'success!'}  );
        },(err)=>next(err))
        .catch((err)=>next(err));
        })
    .put((req,res,next)=>{
        res.statusCode = 403;
        res.end('PUT operation not supported on /pokemon/api/');
        })
    .delete((req,res,next)=>{
        Pokemons.remove({}) //dangerous
        .then((resp)=>{
        res.status.Code=200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
        },(err)=>next(err))
        .catch((err)=>next(err));
        });

pokemonRouter.route('/api/:pokemon_id')
    .all((req,res,next)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        next();
        })
    .get((req,res,next)=>{
        Pokemons.findById(req.params.pokemon_id)
            .then((resultat)=>{
            if(!resultat){
            err = new Error('pokemon with the id '+ req.params.pokemon_id + 'not found.');
            err.status = 404;
            return next(err);
            }
            else{
            res.status.Code=200;
            res.setHeader('Content-Type','application/json');
            res.json(resultat);}
            },(err)=>next(err))
            .catch((err)=>next(err));
        })
    .post((req,res,next)=>{
        res.statusCode = 403;
        res.end('Post operation not supported on /pokemon/api/');
    })
    .delete((req,res,next)=>{
        Pokemons.findByIdAndRemove(req.params.pokemon_id)
        .then((resp)=>{
            res.statusCode=200;
            res.setHeader('Content-Type','application/json');
            res.json(resp);
            },(err)=>next(err))
            .catch((err)=>next(err));
        })
    .put((req,res,next)=>{
        Pokemons.findByIdAndUpdate(req.params.pokemon_id,{$set: req.body},{new:true})
        .then((result)=>{
            res.status.code=200;
            res.setHeader('Content-Type','application/json');
            res.json(result);
            },(err)=>next(err))
            .catch((err)=>next(err));
        })        

           



module.exports = pokemonRouter;