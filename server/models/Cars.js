const mongoose= require('mongoose');

const Carsdata= new mongoose.Schema({
    CarName:{
        type:String,
        required: true,
    },
    CarModel:{
        type:String,
        required: true,
    },
    daysSinceIAte:{
        type:Number,
        required:true,
    }
});

const Cars = mongoose.model("Cars",Carsdata)
module.exports=Cars;