var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var port = process.env.PORT || 8080;

var athletesPerformanceSport = [
{
    city:"almeria",
    year:"2017",
    man:"63",
    woman:"37",
    total:"100"
},{
    city:"cadiz",
    year:"2017",
    man:"87",
    woman:"36",
    total:"123"
},{
    city:"cordoba",
    year:"2017",
    man:"50",
    woman:"37",
    total:"87"
},{
    city:"granada",
    year:"2017",
    man:"95",
    woman:"51",
    total:"146"
},{
    city:"huelva",
    year:"2017",
    man:"31",
    woman:"19",
    total:"50"
},{
    city:"jaen",
    year:"2017",
    man:"30",
    woman:"16",
    total:"46"
},{
    city:"malaga",
    year:"2017",
    man:"147",
    woman:"73",
    total:"220"
},{
    city:"sevilla",
    year:"2017",
    man:"214",
    woman:"182",
    total:"396"
}];

var athletesPerformanceSportInitial = athletesPerformanceSport;

app.use(bodyParser.json());

//LOADINITIALDATA
app.get("/athletes-performance-sport/loadInitialData",(req,res)=>{
    if(athletesPerformanceSport.length == 0){
        res.send(athletesPerformanceSportInitial);
        console.log("La fuente de datos ha sido inicializada");
    }else{
        res.send(athletesPerformanceSport);
    }
});

//GET RECURSO COMPLETO
app.get("/athletes-performance-sport", (req,res)=>{
    console.log("/GET al recurso completo");
    res.send(athletesPerformanceSport);
});
//POST AL RECURSO COMPLETO
app.post("/athletes-performance-sport",(req,res)=>{
    var athlete = req.body;
    console.log("new /POST");
    res.sendStatus(201);
    athletesPerformanceSport.push(athlete);
});
//PUT INCORRECTO
app.put("/athletes-performance-sport",(req,res)=>{
   res.sendStatus(405);
   console.log("/PUT no permitido");
});
//DELETE AL RECURSO COMPLETO
app.delete("/athletes-performance-sport",(req,res)=>{
    console.log("/DELETE al recurso completo");
    res.sendStatus(200);
    athletesPerformanceSport = [];
});
//GET A UN RECURSO CONCRETO
app.get("/athletes-performance-sport/:city", (req,res)=>{
    var city = req.params.city;
    
    var filteredCity = athletesPerformanceSport.filter((c)=>{
        return c.city == city;
    });
    
    if(filteredCity.length >= 1){
        res.send(filteredCity);
    }else{
        res.sendStatus(404);
    }
    console.log("/GET a un recurso concreto");
});
//POST INCORRECTO
app.post("/athletes-performance-sport/:city",(req,res)=>{
   res.sendStatus(405);
   console.log("/POST no permitido");
});
//PUT DE UN RECURSO CONCRETO
app.put("/athletes-performance-sport/:city",(req,res)=>{
    var city = req.params.city;
    var updatedAthlete = req.body;
    var found = false;
    
    var athletesUpdated = athletesPerformanceSport.map((c)=>{
        if(c.city == city){
            found = true;
            return updatedAthlete;
        }else{
            return c;
        }
    });
    
    if(found == false){
        res.sendStatus(404);
    }else{
        athletesPerformanceSport = athletesUpdated;
        res.sendStatus(200);
    }
    console.log("new /PUT");
});
//DELETE DE UN RECURSO CONCRETO
app.delete("/athletes-performance-sport/:city",(req,res)=>{
    var city = req.params.city;
    var found = false;
   
    var deleteAthlete = athletesPerformanceSport.filter((c)=>{
       found = true;
       return c.city != city;
    });
   
    if(found == false){
        res.sendStatus(404);
    }else{
        athletesPerformanceSport = deleteAthlete;
        res.sendStatus(200);
    }
    console.log("/DELETE de un recurso concreto");
});

app.use("/",express.static(__dirname+"/public")); 

app.listen(port,()=>{
   console.log("Magic server ready:" + port); 
});