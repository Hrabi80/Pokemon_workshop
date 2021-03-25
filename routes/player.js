var express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Players = require('../models/players');
const playerRouter = express.Router();
playerRouter.use(bodyParser.json());

// create ENDPOINT
playerRouter.route('/')
  .all( (req,res,next)=>{
      res.StatusCode = 200;
      res.setHeader('Content-Type','application/json');
      next();
  })
  .post( (req,res,next)=>{
    Players.create(req.body).then((resultat)=>{
        console.log('we add a new player',resultat);
        res.status.code = 200;
        res.setHeader('Content-Type','application/json');
        res.json( {success : " sucess"}) ;
    },(err)=>next(err) )
    .catch((err)=>(err));
  })
  .get( (req,res,next)=>{
    Players.find({}).then((resultat)=>{
        console.log('we add a new player',resultat);
        res.status.code = 200;
        res.setHeader('Content-Type','application/json');
        res.json(resultat) ;
    },(err)=>next(err) )
    .catch((err)=>(err));
  })
  .put((req,res,next)=>{
    res.statusCode = 403;
    res.end('PUT operation not supported on /player/');
    })
    .delete((req,res,next)=>{
        Players.remove({}) //dangerous operation
        .then((resp)=>{
        res.status.Code=200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
        },(err)=>next(err))
        .catch((err)=>next(err));
    });

    pokemonRouter.route('/api/:pokemon_id')
     // qdsdqsdqdsqd


module.exports = playerRouter;

