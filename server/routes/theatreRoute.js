const router = require("express").Router();
const theatreModel = require("../models/theatreModel");
// GET ALL THEATRE

//a. Admin should get all the theatres
router.get('/get-all-theatres', async (req, res) => {
    try {
        const alltheatres = await theatreModel.find().populate('owner') // this will get the full details of the user and send it with theatre detail
        res.status(200).send({
            success: true,
            message: "All theatres fetched successfully",
            data: alltheatres,
        })
    } catch (err) {
        res.status(404).send({
            success:false,
            message:err.message
        })
    }
})



//b. Partners should get their own theatres alone

router.post('/get-all-theatres-by-owner', async (req, res) => {
    try {
        const alltheatres = await theatreModel.find({ owner: req.body.owner })
        res.status(200).send({
            success: true,
            message: "All Theatre fetched successfully",
            data: alltheatres
        })
    } catch (err) {
        res.status(404).send({
            success: false,
            message: err.message
        })
    }
});

// Add a Theatre
router.post('/add-theatre', async (req, res) => {
    try {
        const newTheatre = new theatreModel(req.body);
        await newTheatre.save();
        res.status(200).send({
            success: true,
            message: "New Theatre has been added!",
            data: newTheatre,
        })
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        })
    }
});





// Edit/update the Theatre
router.put("/update-theatre", async (req, res) => {
    try {
        const updatedTheatre = await theatreModel.findByIdAndUpdate(req.body._id, req.body, { new: true }) // new:true -> to return the updated doc after updation
        if (!updatedTheatre) {
            return res.status(404).send({
                success: false,
                message: "Theatre not found !",
            })
        }
        return res.status(200).send({
            success: true,
            message: "Theatre Updated successfully",
            data:updatedTheatre,
        })
    } catch (err) {
        return res.status(500).send({
            success: false,
            error: err.message,
        })
    }
})

// DELETE a Theatre
router.delete("/delete-theatre/:id", async (req, res) => {
    const theatre = await theatreModel.findByIdAndDelete(req.params.id);
    try {
        if (!theatre) {
            res.status(404).send({
                success: false,
                message: "Theatre not found!"
            })
        }
        res.status(200).send({
            success: true,
            message: "Theatre has been deleted!"
        })
    } catch (err) {
        res.status(500).send({
            success: false,
            error: err.message,
        })
    }
})

module.exports = router;