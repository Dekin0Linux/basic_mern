const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
// const { response } = require('express');

const app = express();  //invokng express

dotenv.config();

//connecting to DB (mongoDB)
mongoose.connect('mongodb://localhost:27017/data').then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log('http://localhost:4000')
    }) //app can listen for request now 
});

//creating a basic schema
const schema = mongoose.Schema({
    name : {
        type:String,
        required : true
    },
    fav :  {
        type:String,
        required : true
    }
},{timestamps:true})
//create a model for the schema 
const model = mongoose.model('user',schema);


//body parser for form input
app.use(express.json())

//fetch all data
app.get('/user',async(req,res)=>{
    res.set("Access-Control-Allow-Orgin","http://localhost:3000");
    const getdata = await model.find({}).sort({createdAt:-1});
    res.send(getdata);
})

//post a new data
app.post('/user',async (req,res)=>{
    res.set("Access-Control-Allow-Orgin","http://localhost:3000");
    await model.insertMany({
        name : req.body.name,
        fav : req.body.fav
    })
    res.send("Data Sent to DB")
})

//get single user
app.get('/user/:id',async (req,res)=>{
    res.set("Access-Control-Allow-Orgin","http://localhost:3000");
    const id = req.params.id; //grab id from parameter
    const getSingle = await model.findById(id)
    res.send(getSingle)
})

//update a data
app.put('/user/:id',(req,res)=>{
    res.set("Access-Control-Allow-Orgin","http://localhost:3000");
    const id = req.params.id; //grabbing ID
    model.findByIdAndUpdate(id,{fav : req.body.fav ,name:req.body.name },(err,doc)=>{
        if(err){
            console.log(err)
        }else{
            res.send(doc)
        }
    })
    
})

//deleted Data
app.delete('/user/:id', (req,res)=>{
    res.set("Access-Control-Allow-Orgin","http://localhost:3000");
    const id = req.params.id;
    model.findByIdAndDelete(id,(err,doc)=>{
        if(err){

            console.log(err)
        }else{
            res.json({msg : "Data Deleted"})
        }
    })
})










