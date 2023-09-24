import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";


const app=express();

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use('/public',express.static('public'));


let itemList=[];
let workItems = [];
app.get('/',(req,res)=>{
    const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
    let date=new Date().toLocaleDateString("en-US",options);;  
    res.render("index.ejs",{listTitle:date,nextItem:itemList});  
   
});

app.post("/", function(req, res){

  const item = req.body.newItem;

  if (req.body.list === "Work List") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    itemList.push(item);
    res.redirect("/");
  }
});

app.get("/work", function(req,res){
  res.render("index.ejs", {listTitle: "Work List", nextItem: workItems});
});


app.listen(3000,()=>console.log("port is running server 3000"));