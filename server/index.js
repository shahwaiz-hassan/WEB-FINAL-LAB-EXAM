const express = require('express');
const mongoose= require('mongoose');
const cors= require('cors');
const app= express()

const CModel= require("./models/Cars");

app.use(express.json());
app.use(cors());
mongoose.connect('mongodb://localhost:27017',{
    useNewURLParser:true,
});

app.post("/insert",async (req, res)=> {
    const CarName=req.body.CarName;
    const CarModel=req.body.CarModel;
    const days=req.body.days;

    
    const Cars= new CModel({ CarName:CarName,CarModel:CarModel, daysSinceIAte:days});

    try{
        await Cars.save();
        res.send("inserted data");
    }catch(err){
        console.log(err);
    }
})


app.get("/read",async (req, res)=> {
    CModel.find({},(err,result)=>{
        if(err){
            res.send(err);
         }
         res.send(result);
        
    })
})


app.put("/update",async (req, res)=> {
    const newCarName=req.body.newCarName;
    const id=req.body.id;

    try{
        await CModel.findById(id,(err,updatedFood)=>{
            updatedCars.CarName= newCarName;
            updatedCars.save();
            res.send("update");
        })
    }catch(err){
        console.log(err);
    }
})



app.delete("/delete/:id",async (req, res)=> {
   const id= req.params.id;
   await CModel.findByIdAndRemove(id).exec();
   res.send("deleted");
})




app.listen(3001, () => {
    console.log("Server running");
})