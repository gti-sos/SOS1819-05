var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.json());
app.use("/",express.static(__dirname+"/public"));

var port = process.env.PORT || 8080;

/*---------------------------------------*/
/*------------API ÁLVARO------------------*/
/*---------------------------------------*/
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


/*---------------------------------------*/
/*------------API MARTA------------------*/
/*---------------------------------------*/
var studentsAndalucia = [{
    city: "almeria",
    year: "2017",
    esoStudent: "31.925",
    highSchoolStudent: "10.618",
    vocationalTraining: "1.045"
},{
    city: "cadiz",
    year: "2017",
    esoStudent: "60.230",
    highSchoolStudent: "21.499",
    vocationalTraining: "2.219"
},{
    city: "cordoba",
    year: "2017",
    esoStudent: "34.346",
    highSchoolStudent: "12.904",
    vocationalTraining: "1.446"
},{
    city: "granada",
    year: "2017",
    esoStudent: "40.821",
    highSchoolStudent: "15.536",
    vocationalTraining: "1.564"
},{
    city: "huelva",
    year: "2017",
    esoStudent: "23.958",
    highSchoolStudent: "7.638",
    vocationalTraining: "1.020"
},{
    city: "jaen",
    year: "2017",
    esoStudent: "28.106",
    highSchoolStudent: "10.759",
    vocationalTraining: "966"
},{
    city: "malaga",
    year: "2017",
    esoStudent: "72.710",
    highSchoolStudent: "25.868",
    vocationalTraining: "2.275"
},{
    city: "sevilla",
    year: "2017",
    esoStudent: "92.661",
    highSchoolStudent: "32.807",
    vocationalTraining: "2.457"
}];

//GET /studentsAndalucia/

app.get("/studentsAndalucia", (req,res)=>{
    res.send(studentsAndalucia);
});

//POST /studentsAndalucia/

app.post("/studentsAndalucia", (req,res)=>{
   var newStudentsAndalucia = req.body;
   
   studentsAndalucia.push(newStudentsAndalucia);
   
   res.sendStatus(200);
    
});


//DELETE /studentsAndalucia/

app.delete("/studentsAndalucia", (req,res)=>{
 
    studentsAndalucia = [];
    
   res.sendStatus(201);
    
});


//GET /studentsAndalucia/2017/malaga

app.get("/studentsAndalucia/:city", (req,res)=>{
    
    var city = req.params.city;

   var filteredStudents = studentsAndalucia.filter((c)=>{
       return c.city == city;
   })
   
   if(filteredStudents.length >= 1){
       res.send(filteredStudents[0]);
   }else{
       res.sendStatus(404);
   }
    
});

//PUT /studentsAndalucia/malaga

app.put("/studentsAndalucia/:city", (req,res)=>{
    
    var city = req.params.city;
    var updateStudents = req.body;
    var found = false;


   var updateStudents = studentsAndalucia.map((c)=>{
       
       if(c.city == city){
           found = true;
           return updateStudents;
       }else{
           return c;
       }
       
   });
   
   
   if(found == false){
       res.sendStatus(404);
   }else{
       studentsAndalucia = updateStudents;
       res.sendStatus(200);
   }
    
});

//DELETE /studentsAndalucia/malaga

app.delete("/studentsAndalucia/:city", (req,res)=>{
    
    var city = req.params.city;
    var found = false;


   var updateStudents = studentsAndalucia.filter((c)=>{
       
        if(c.city == city)
            found = true;
        
        
        return c.city != city;

   });
   
   
   if(found == false){
       res.sendStatus(404);
   }else{
       studentsAndalucia = updateStudents;
       res.sendStatus(200);
   }
    
});

app.listen(port, () =>{
    console.log("Magic server ready on port " + port);
});