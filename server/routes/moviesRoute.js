const express = require('express');
const router = express.Router();
const movieModel = require('../models/movieModel');


// adding movie 
router.post('/add-movie', async(req, res) => {
    try{
        const newMovie = new movieModel(req.body);
        await newMovie.save()
        res.status(200).send({
            success:true,
            message: 'New movie has been added!',
            data: newMovie
        })   
    } catch(error){
        res.status(401).send({
            success:false,
            message:error.message,
        })
    }
})

// get all movies
router.get('/get-all-movies', async(req, res)=>{
    try{
        const allmovies = await movieModel.find()
        res.status(200).send({
            success:true,
            message:"all movies has been fetched",
            data:allmovies
        })
    } catch(error){
        res.status(401).send({
            success:false,
            message:error.message,
        })
    }
})

// update movie
router.put('/update-movie', async(req, res)=>{
    try{
        const movie = await movieModel.findByIdAndUpdate(req.body._id, req.body, {new:true})
        
        if(!movie){
            return res.status(404).send({  // Add 'return' here
                success:false,
                message:"Movie not found",
            })
        }
        
        res.status(200).send({
            success:true,
            message:'Movie has been successfully updated',  // Fixed typo: "updates" -> "updated"
            data:movie
        })

    } catch(error){
        res.status(500).send({  // Changed from 401 to 500 for server errors
            success:false,
            message:error.message,
        })
    }
})


// fetch single movie and all movies
router.get('/movie/:id', async(req, res)=>{
    try{
        const movie = await movieModel.findById(req.params.id);
        if(!movie){
            res.status(404).send({
                success:false,
                message:"Movie not found",
            })
        }   
        res.status(200).send({
            success:true,
            message:"Movie has been fetched successfully",
            data:movie,
        })
    } catch(error){
        res.status(401).send({
            success:false,
            message:error.message,
        })
    }
})

//deleting a movie
router.delete('/delete-movie/:id', async(req, res)=>{
    try{
        const movie = await movieModel.findByIdAndDelete(req.params.id); // id is passed by the user from the client side 
        if(!movie){
            res.status(404).send({
                success:false,
                message:"Movie not found",
            })
        }

        res.status(200).send({
            success:true,
            messsage:"The movie has been deleted",
        })
    } catch(error){
        res.status(401).send({
            success:false,
            message:error.message,
        })
    }
})
module.exports = router;