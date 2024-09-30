const express=require("express");
const users=require("./sample.json")
const cors =require("cors")
const fs=require("fs");
const app=express();
//middleware
app.use(express.json())
//initialize the application
app.use(express());
app.use(cors({
   origin:"http://localhost:5173" ,
   methods:["GET","POST","PATCH","DELETE"]
}))

//get the json data
app.get("/users",(req,res)=>{
  res.json(users)
   
})

//post data

app.post("/users",(req,res)=>{
  const {name,age,city}=req.body;
  let id=Date.now();
  if(!name || !age || !city){
    return false
  }else{

  
  users.push({id,name,age,city})
  console.log(req.body)
  console.log(users)
}
  fs.writeFile("./sample.json",JSON.stringify(users),(err,data)=>{
    return res.json({message:"data has been added"})
  })
})

//delete the data
app.delete("/users/:id",(req,res)=>{
  let id=Number(req.params.id);
 
   let filterValue=users.filter((user)=>{
    return user.id!==id
   })
   fs.writeFile('./sample.json',JSON.stringify(filterValue),(err,data)=>{
    res.json(filterValue)
   })
})

//update the data
app.patch("/users/:id",(req,res)=>{
  let id=Number(req.params.id);
  let{name,age,city}=req.body;
  let index=users.findIndex((user)=> user.id==id)
  users.splice(index,1,{...req.body})


  fs.writeFile("./sample.json",JSON.stringify(users),(err,data)=>{
    return res.json({message:"user detail is updated"})
  })
})

app.listen(3000,()=>{
    console.log("server has been connected")
})









