const express = require('express');
const bodyParser= require('body-parser');
const gtts = require('gtts.js').gTTS
const app=express();
app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine','ejs');
app.use(express.static("public"));
app.get("/",function(req,res){
  res.render('index')
});
app.post("/",function(req,res){
  const text=req.body.text.replace(/[^a-zA-Z," " ]/g, "");
  const name=req.body.name;
  const speech=new gtts(text)
  speech.save(name+".mp3")
  .then(function(){
    res.download(name+".mp3");
  }).catch(function(err){
    console.log(err);
  })
})

var port = process.env.PORT || 3000
app.listen(port,function(){
  console.log("started on 3000s");
})
