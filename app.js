const express = require("express");
      app = express();
      var fs = require('fs');
      cors = require('cors');
      bodyParser = require("body-parser");
      mongoose = require("mongoose");
      fileUpload = require('express-fileupload');
      cloudinary = require("cloudinary").v2;
      const path = require('path');
      require('dotenv').config()

      app.use(fileUpload({
        useTempFiles:true,
       
      }));

      cloudinary.config({ 
        cloud_name: 'seeker317', 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
      });
     
      
      app.use(express.json());
      app.use(cors());
      app.set("view engine", "ejs");
      app.use(bodyParser.urlencoded({extended: true}));

      mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://thranduil:2m6KVbbi9W4Wn1kp@cluster0-66agq.gcp.mongodb.net/test?retryWrites=true&w=majority",{
        useNewUrlParser: true,
        useCreateIndex: true
    }).then(()=>{
        console.log("Connected to db");
    }).catch(err=>{
        console.log("error:", err.message);
    })
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //MODELS
const eventSchema = new mongoose.Schema({
    file: String ,
    name: String,
    description: String,
    date: String,
    org: String,
    orgurl: String,
    city: String
});
const Event = mongoose.model("Event", eventSchema);

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//GET ROUTE
app.get("/upcoming", (req, res)=>{
    Event.find({}, (err, allEvent)=>{
    if(err){
        console.log(err);
    } else{
        res.json(allEvent);
    }
    });
});


//POST ROUTE 
app.post("/upcoming", function(req, res){
    if (req.files === undefined) {
        return res.status(400).json({ msg: 'No file uploaded' });
      }
    else{
      const file = req.files.file;
        cloudinary.uploader.upload(file.tempFilePath, (err, result)=>{
        if(err){
          console.log("Error: " , err);
        }
        console.log("Result:",  result);
        
          
            req.files.file= result;
            var evt = new Event;
            evt.file = result.secure_url;
            evt.name = req.body.name;
            evt.description = req.body.description;
            evt.date = req.body.date;
            evt.org = req.body.org;
            evt.orgurl = req.body.orgurl;
            evt.city = req.body.city;
            evt.save(function (err, evt) {
              if (err) {
                  console.log(err);
              } else{
                res.json('event added and image added to mongo');
              console.error('saved img to mongo');
              }
            }) 
          });
        }
      });
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('readsnet-front/build'));

    app.get('*', (req, res)=>{
        res.sendFile(path.resolve(__dirname, 'readsnet-front', 'build', 'index.html'))
    })
}
app.listen(process.env.PORT || 5000, ()=>{
    console.log('http://localhost:5000')
});

