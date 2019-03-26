var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var API_PATH = "/api/v1";

const MongoClient = require("mongodb").MongoClient;

const uri_mvm ="mongodb+srv://test:test@sos-iyxd4.mongodb.net/test?retryWrites=true";
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



//LOADINITIALDATA
app.get(API_PATH +"/students-andalucia/loadInitialData",(req,res)=>{
    
        var students = [{
        city: "almeria",
        year: 2017,
        eso: 31925,
        high: 10618,
        vocational: 1045
    },{
        city: "cadiz",
        year: 2017,
        eso: 60230,
        high: 21499,
        vocational: 2219
    },{
        city: "cordoba",
        year: 2017,
        eso: 34346,
        high: 12904,
        vocational: 1446
    },{
        city: "granada",
        year: 2017,
        eso: 40821,
        high: 15536,
        vocational: 1564
    },{
        city: "huelva",
        year: 2017,
        eso: 23958,
        high: 7638,
        vocational: 1020
    },{
        city: "jaen",
        year: 2017,
        eso: 28106,
        high: 10759,
        vocational: 966
    },{
        city: "malaga",
        year: 2017,
        eso: 72710,
        high: 25868,
        vocational: 2275
    },{
        city: "sevilla",
        year: 2017,
        eso: 92661,
        high: 32807,
        vocational: 2457
    }];
    
    studentsAndalucia.find({}).toArray((err, studentsArray) => {
        
        if(studentsArray.length == 0){
            studentsAndalucia.insert(students);
            res.sendStatus(200);
        }
        else {
            res.sendStatus(409);
        }
    });  
});

//GET /studentsAndalucia/

app.get(API_PATH +"/students-andalucia", (req,res)=>{
    
    studentsAndalucia.find({}).toArray((err, studentsArray)=>{
        if(err)
            console.log("Error: "+err);
    
        res.send(studentsArray); 
    });
    
    
});

//POST /studentsAndalucia/

app.post(API_PATH +"/students-andalucia", (req,res)=>{
   var newStudentsAndalucia = req.body;
   var city = req.body.city;
   
   studentsAndalucia.find({"city":city}).toArray((err, studentsArray)=>{
        if(err)
            console.log(err);
            
        if(studentsArray !=0){
            
            res.sendStatus(409);
            
        }else if (!newStudentsAndalucia.city || !newStudentsAndalucia.year 
        ||!newStudentsAndalucia.eso || !newStudentsAndalucia.high 
        ||!newStudentsAndalucia.vocational || Object.keys(newStudentsAndalucia).length != 6){
            
            res.sendStatus(400);
        }else{
        
            studentsAndalucia.insert(newStudentsAndalucia);
   
            res.sendStatus(201);
        }
       
   });
   

    
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
        if(err)
            console.log("Error: "+err);
        
        if(studentsArray ==0){
            res.sendStatus(404);
        }else{
            res.send(studentsArray);
        }
    });
    
});

//PUT /studentsAndalucia/malaga

app.put(API_PATH +"/students-andalucia/:city", (req,res)=>{
    
    var city = req.params.city;
    var updateStudents = req.body;
   
   
    studentsAndalucia.find({"city":city}).toArray((err, studentsArray)=>{
        if(err)
            console.log(err);
        
        
        if (studentsArray==0){
            
            res.sendStatus(404);
            
        }else if (!updateStudents.city || !updateStudents.year 
        ||!updateStudents.eso || !updateStudents.high 
        ||!updateStudents.vocational || Object.keys(updateStudents).length != 6){
            
            res.sendStatus(400);
            
        }else{
            
            studentsAndalucia.updateOne({ "city": city }, { $set: updateStudents });
            res.sendStatus(200);
            
        }
    });
    
});

//DELETE /studentsAndalucia/malaga

app.delete(API_PATH +"/students-andalucia/:city", (req,res)=>{
    
    var city = req.params.city;

    studentsAndalucia.find({"city": city}).toArray((err, studentsArray)=>{
        if(err)
            console.log(err);
                
        if (studentsArray==0){
            
            res.sendStatus(404);
            
        }else{
            
            studentsAndalucia.deleteOne({"city":city});
            res.sendStatus(200);
    
        }
    });
});

//POST incorrecto
app.post(API_PATH +"/students-andalucia/:city",(req,res)=>{
   res.sendStatus(405);
});

//PUT incorrecto
app.put(API_PATH +"/students-andalucia/",(req,res)=>{
   res.sendStatus(405);
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