var express = require("express");
var bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.json());

var port = process.env.PORT || 8080;

app.use("/",express.static(__dirname+"/public"));

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
    console.log("Super server ready on port " + port);
});