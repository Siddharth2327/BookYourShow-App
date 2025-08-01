const mongoose = require("mongoose");

const theatreSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,  // inbuilt , method in mongoose to access the object id directly
        ref:'User' // this will make a connection between the collections
    },
    isActive:{
        type:Boolean,
        default:false,
    }
},
{timestamps:true}
)

const Theatre = mongoose.model("theatres",theatreSchema);
module.exports = Theatre

// create the schema 
// create the model using the schema
// export it 