const router = require("express").Router();
const ShowModel = require("../models/showModel");

// Add show 
router.post("/add-show", async (req, res) => {
    try {
        const newShow = new ShowModel(req.body);
        await newShow.save();
        res.status(200).send({
            success: true,
            message: "Show has been added!",
        })
    } catch (err) {
        res.status(404).send({
            success: false,
            message: err.message,
        })
    }
});


// Update show
router.put("/update-show", async (req, res) => {
    try {
        await ShowModel.findByIdAndUpdate(req.body._id, req.body, { new: true });
        res.status(200).send({
            success: true,
            message: "Show Updated successfully",
        })
    } catch (err) {
        res.status(404).send({
            success: false,
            message: err.message,
        })
    }
})


// Delete the show
router.delete("/delete-show", async (req, res) => {
    try {
        await ShowModel.findOneAndDelete(req.body._id);
        res.status(200).send({
            success: true,
            message: "Show removed",
        })
    } catch (err) {
        res.status(404).send({
            success:false,
            message:err.message,
        })
    }
})

// get shows by theatres


// get shows by movies


// get all theatres by movies


// get show by id


module.exports = router