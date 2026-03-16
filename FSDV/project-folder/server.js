const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static("public"));

const db = mysql.createConnection({
host:"localhost",
user:"root",
password:"123456",
database:"campus_events"
});

db.connect(err=>{
if(err){
console.log("Database connection failed");
}else{
console.log("Database connected");
}
});


/* Register Event */

app.post("/register",(req,res)=>{

const {name,email,vtu,dept,event} = req.body;

const sql = "INSERT INTO registrations (name,email,vtu_number,department,event_name) VALUES (?,?,?,?,?)";

db.query(sql,[name,email,vtu,dept,event],(err,result)=>{

if(err){
console.log(err);
res.send("Error occurred");
}
else{
res.redirect("/success.html?name="+name);
}

});

});


/* Get Events */

app.get("/events",(req,res)=>{
db.query("SELECT * FROM events",(err,result)=>{
if(err){
res.send(err);
}else{
res.json(result);
}
});
});

app.get("/registrations",(req,res)=>{

db.query("SELECT * FROM registrations",(err,result)=>{

if(err){
res.send("Error fetching data");
}else{
res.json(result);
}

});

});

app.get("/registrations",(req,res)=>{

db.query("SELECT * FROM registrations",(err,result)=>{
if(err){
res.send(err);
}else{
res.json(result);
}
});

});

app.listen(3000,()=>{
console.log("Server running http://localhost:3000");
});