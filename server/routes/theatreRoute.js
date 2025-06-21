const router = require("express").Router();
const theatreModel = require("../models/theatreModel");


// Add a Theatre
router.post('/add-theatre', async (req, res) => {
    try {
        const newTheatre = new theatreModel(req.body);
        await newTheatre.save();
        res.status(200).send({
            success: true,
            message: "New Theatre has been added!"
        })
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        })
    }
});


// GET ALL THEATRE

//a. Admin should get all the theatres

//b. Partners should get their own theatres alone


// Edit/update the Theatre
router.put("/update-theatre", async (req, res) => {
    try {
        const updatedTheatre = await theatreModel.findByIdAndUpdate(req.body._id, req.body, { new: true }) // new:true -> to return the updated doc after updation
        if (!updatedTheatre) {
            res.status(404).send({
                success: false,
                message: "Theatre not found !",
            })
        }
        res.status(200).send({
            success: true,
            message: "Theatre Updated successfully",
        })
    } catch (err) {
        res.status(500).send({
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
            success:false,
            error:err.message,
        })
    }
})

module.exports = router;