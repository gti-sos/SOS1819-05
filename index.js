var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var API_PATH = "/api/v1";

const MongoClient = require("mongodb").MongoClient;

const uri_mvm = "mongodb+srv://test:test@sos-iyxd4.mongodb.net/sos?retryWrites=true";
const client_mvm = new MongoClient(uri_mvm, { useNewUrlParser: true });

var studentsAndalucia;

client_mvm.connect(err => {
  studentsAndalucia = client_mvm.db("sos1819").collection("students-andalucia");
  console.log("Connected!");
});





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
app.get(API_PATH + "/athletes-performance-sport/loadInitialData",(req,res)=>{
    if(athletesPerformanceSport.length == 0){
        athletesPerformanceSport = athletesPerformanceSportInitial;
        res.send(athletesPerformanceSport);
        console.log("La fuente de datos ha sido inicializada");
    }else{
        res.send(athletesPerformanceSport);
    }
});

//GET RECURSO COMPLETO
app.get(API_PATH +"/athletes-performance-sport", (req,res)=>{
    console.log("/GET al recurso completo");
    res.send(athletesPerformanceSport);
});
//POST AL RECURSO COMPLETO
app.post(API_PATH +"/athletes-performance-sport",(req,res)=>{
    var athlete = req.body;
    console.log("new /POST");
    res.sendStatus(201);
    athletesPerformanceSport.push(athlete);
});
//PUT INCORRECTO
app.put(API_PATH +"/athletes-performance-sport",(req,res)=>{
   res.sendStatus(405);
   console.log("/PUT no permitido");
});
//DELETE AL RECURSO COMPLETO
app.delete(API_PATH +"/athletes-performance-sport",(req,res)=>{
    console.log("/DELETE al recurso completo");
    res.sendStatus(200);
    athletesPerformanceSport = [];
});
//GET A UN RECURSO CONCRETO
app.get(API_PATH +"/athletes-performance-sport/:city", (req,res)=>{
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
app.post(API_PATH +"/athletes-performance-sport/:city",(req,res)=>{
   res.sendStatus(405);
   console.log("/POST no permitido");
});
//PUT DE UN RECURSO CONCRETO
app.put(API_PATH +"/athletes-performance-sport/:city",(req,res)=>{
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
app.delete(API_PATH +"/athletes-performance-sport/:city",(req,res)=>{
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


/*------------------------------------------------------------------------------------*/
/*--------------------------------------API MARTA-------------------------------------*/
/*------------------------------------------------------------------------------------*/
var students = [{
    city: "almeria",
    year: 2017,
    esoStudent: 31.925,
    highSchoolStudent: 10.618,
    vocationalTraining: 1.045
},{
    city: "cadiz",
    year: 2017,
    esoStudent: 60.230,
    highSchoolStudent: 21.499,
    vocationalTraining: 2.219
},{
    city: "cordoba",
    year: 2017,
    esoStudent: 34.346,
    highSchoolStudent: 12.904,
    vocationalTraining: 1.446
},{
    city: "granada",
    year: 2017,
    esoStudent: 40.821,
    highSchoolStudent: 15.536,
    vocationalTraining: 1.564
},{
    city: "huelva",
    year: 2017,
    esoStudent: 23.958,
    highSchoolStudent: 7.638,
    vocationalTraining: 1.020
},{
    city: "jaen",
    year: 2017,
    esoStudent: 28.106,
    highSchoolStudent: 10.759,
    vocationalTraining: 966
},{
    city: "malaga",
    year: 2017,
    esoStudent: 72.710,
    highSchoolStudent: 25.868,
    vocationalTraining: 2.275
},{
    city: "sevilla",
    year: 2017,
    esoStudent: 92.661,
    highSchoolStudent: 32.807,
    vocationalTraining: 2.457
}];

var studentsAndaluciaInitial = students;

//LOADINITIALDATA
app.get(API_PATH +"/students-andalucia/loadInitialData",(req,res)=>{
    studentsAndalucia.find({}).toArray((err, studentsArray)=>{
        
        if(studentsArray.length == 0){
            studentsAndalucia.insert(studentsAndaluciaInitial);
            res.send(studentsArray);
        }else{
            res.send(studentsArray);
        }
    });   
});

//GET /studentsAndalucia/

app.get(API_PATH +"/students-andalucia", (req,res)=>{
    
    studentsAndalucia.find({}).toArray((err, studentsArray)=>{
       
       res.send(studentsArray); 
    });
    
    
});

//POST /studentsAndalucia/

app.post(API_PATH +"/students-andalucia", (req,res)=>{
   var newStudentsAndalucia = req.body;
   
   studentsAndalucia.insert(newStudentsAndalucia);
   
   res.sendStatus(201);
    
});


//DELETE /studentsAndalucia/

app.delete(API_PATH +"/students-andalucia", (req,res)=>{
 
    studentsAndalucia.remove({});
    
   res.sendStatus(200);
    
});


//GET /studentsAndalucia/2017/malaga

app.get(API_PATH +"/students-andalucia/:city", (req,res)=>{
    
    var city = req.params.city;
    
    studentsAndalucia.find({"city": city}).toArray((err, studentsArray)=>{
       
        res.send(studentsArray); 
    });
   
    if(studentsArray.length >= 1){
        res.send(studentsArray);
    }else{
        res.sendStatus(404);
    }
    
});

//PUT /studentsAndalucia/malaga

app.put(API_PATH +"/students-andalucia/:city", (req,res)=>{
    
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

//POST incorrecto
app.post(API_PATH +"/students-andalucia/:city",(req,res)=>{
   res.sendStatus(405);
   console.log("/POST no permitido");
});

//PUT incorrecto
app.put(API_PATH +"/students-andalucia/",(req,res)=>{
   res.sendStatus(405);
   console.log("/PUT no permitido");
});

//DELETE /studentsAndalucia/malaga

app.delete(API_PATH +"/students-andalucia/:city", (req,res)=>{
    
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



/*---------------------------------------*/
/*------------API ENRIQUE------------------*/
/*---------------------------------------*/

var libraries = [{
    city: "Almeria",
    year: 2017, 
    number : 97, 
    activities: 79,
    service: 96.62
}, {
    city: "Cadiz",
    year: 2017, 
    number: 76, 
    activitites: 58,
    service: 99.76
}, {
    city: "Cordoba",
    year: 2017, 
    number: 95, 
    activitites: 77,
    service: 99.80 
}, {
    city: "Granada",
    year: 2017, 
    number: 122, 
    activitites: 97,
    service: 89.65 
}, {
    city: "Huelva",
    year: 2017, 
    number: 81, 
    activitites: 70,
    service: 96.62
}, {
    city: "Jaen",
    year: 2017, 
    number: 105, 
    activitites: 69,
    service: 95.03 
}, {
    city: "Malaga",
    year: 2017, 
    number: 152, 
    activitites: 121,
    service: 98.80 
}, {
    city: "Sevilla",
    year: 2017, 
    number: 133, 
    activitites: 110,
    service: 98.77 
}];

var librariesInitial = libraries;

//LOADINITIALDATA
app.get(API_PATH +"/libraries-stats/loadInitialData",(req,res)=>{
    if(libraries.length == 0){
        libraries = librariesInitial;
        res.send(libraries);
    }else{
        res.send(libraries);
    }
});

// GET /libraries/

app.get(API_PATH +"/libraries-stats", (req,res)=>{
    res.send(libraries);
});


// POST /libraries/

app.post(API_PATH +"/libraries-stats", (req,res)=>{
    
    var newLlibraries = req.body;
    
    libraries.push(newLlibraries)
    
    res.sendStatus(201);
});


// DELETE /libraries/

app.delete(API_PATH +"/libraries-stats", (req,res)=>{
    
    libraries =  [];

    res.sendStatus(200);
});


//POST incorrecto
app.post(API_PATH +"/libraries-stats/:city",(req,res)=>{
   res.sendStatus(405);
   console.log("/POST no permitido");
});

//PUT incorrecto
app.put(API_PATH +"/libraries-stats/",(req,res)=>{
   res.sendStatus(405);
   console.log("/PUT no permitido");
});


// GET /libraries-stats/almeria

app.get(API_PATH +"/libraries-stats/:city", (req,res)=>{

    var city = req.params.city;

    var filteredLibraries = libraries.filter((c) =>{
       return c.city == city; 
    })
    
    if (filteredLibraries.length >= 1){
        res.send(filteredLibraries[0]);
    }else{
        res.sendStatus(404);
    }

});


// PUT /libraries-stats/almeria

app.put(API_PATH +"/libraries-stats/:city", (req,res)=>{

    var city = req.params.city;
    var updatedLibraries = req.body;
    var found = false;

    var updatedLibraries = libraries.map((c) =>{
    
        if(c.city == city){
            found = true;
            return updatedLibraries;
        }else{
            return c;            
        }
 
    });
    
    if (found == false){
        res.sendStatus(404);
    }else{
        libraries = updatedLibraries;
        res.sendStatus(200);
    }

});


// DELETE /libraries/almeria

app.delete(API_PATH +"/libraries-stats/:city", (req,res)=>{

    var city = req.params.city;
    var found = false;

    var updatedLibraries = libraries.filter((c) =>{
        
            if(c.city == city)  
                found = true;
        
            return c.city != city;
    });
    
    if (found == false){
        res.sendStatus(404);
    }else{
        libraries = updatedLibraries;
        res.sendStatus(200);
    }

});


app.listen(port, () =>{
    console.log("Magic server ready on port " + port);
});