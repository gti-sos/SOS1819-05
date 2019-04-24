module.exports = function(app, API_PATH, studentsAndalucia){

    
/*---------------------------------------*/
/*------------API MARTA------------------*/
/*---------------------------------------*/

    var student = [{
            "city": "almeria",
            "year": 2017,
            "eso": 31925,
            "high": 10618,
            "vocational": 1045
        },
        {
            "city": "cordoba",
            "year": 2017,
            "eso": 34346,
            "high": 12904,
            "vocational": 1446
        },
        {
            "city": "cadiz",
            "year": 2017,
            "eso": 60230,
            "high": 21499,
            "vocational": 2219
        },
        {
            "city": "granada",
            "year": 2017,
            "eso": 40821,
            "high": 15536,
            "vocational": 1564
        },
        {
            "city": "jaen",
            "year": 2017,
            "eso": 28106,
            "high": 10759,
            "vocational": 966
        },
        {
            "city": "huelva",
            "year": 2017,
            "eso": 23958,
            "high": 7638,
            "vocational": 1020
        },
        {
            "city": "malaga",
            "year": 2017,
            "eso": 72710,
            "high": 25868,
            "vocational": 2275
        },
        {
            "city": "sevilla",
            "year": 2017,
            "eso": 92661,
            "high": 32807,
            "vocational": 2457
        }];
        
//LOADINITIALDATA
app.get(API_PATH + "/students-andalucia/loadInitialData", (req, res) => {

    studentsAndalucia.find({}).toArray((err, studentsArray) => {
        if (err) {
                console.log("Error: " + err);
        }
        else if(studentsArray.length == 0){
            studentsAndalucia.insertMany(student);
            res.sendStatus(201);
        }else{
            res.sendStatus(409);
        }
    });
});

//GET /studentsAndalucia/


app.get(API_PATH + "/students-andalucia", function(req, res) {
        var dbquery = {};
        let offset = 0;
        let limit = Number.MAX_SAFE_INTEGER;

        if (req.query.offset) {
            offset = parseInt(req.query.offset);
            delete req.query.offset;
        }
        if (req.query.limit) {
            limit = parseInt(req.query.limit);
            delete req.query.limit;
        }

        Object.keys(req.query).forEach((i) => {
            if (isNaN(req.query[i]) == false) {
                dbquery[i] = parseInt(req.query[i]);
            }
            else {
                dbquery[i] = req.query[i];
            }
        });

        if (Object.keys(req.query).includes('from') && Object.keys(req.query).includes('to')) {
            delete dbquery.from;
            delete dbquery.to;
            dbquery['city'] = { "$lte": parseInt(req.query['to']), "$gte": parseInt(req.query['from']) };
        }
        else if (Object.keys(req.query).includes('from')) {
            delete dbquery.from;
            dbquery['city'] = { "$gte": parseInt(req.query['from']) };
        }
        else if (Object.keys(req.query).includes('to')) {
            delete dbquery.to;
            dbquery['city'] = { "$lte": parseInt(req.query['to']) };
        }

        studentsAndalucia.find(dbquery).skip(offset).limit(limit).toArray((err, studentsArray) => {
            if (err) {
                console.error(" Error accesing DB");
                res.sendStatus(500);
                return;
            }
            else if (studentsArray.length == 0) {
                res.send([]);
            }
            else {
                res.send(studentsArray.map((s) => {
                    delete s._id;
                    return s;
                }));
            }
        });
    });

//POST /studentsAndalucia/

app.post(API_PATH + "/students-andalucia", (req, res) => {
    var newStudentsAndalucia = req.body;
    var city = req.body.city;

    studentsAndalucia.find({ "city": city }).toArray((err, studentsArray) => {
        if (err)
            console.log(err);

        if (studentsArray != 0) {
            console.log("Conflicto porque el objeto ya existe");
            res.sendStatus(409);

        }
        else if (!newStudentsAndalucia.city || !newStudentsAndalucia.year ||
            !newStudentsAndalucia.eso || !newStudentsAndalucia.high ||
            !newStudentsAndalucia.vocational || Object.keys(newStudentsAndalucia).length != 5) {

            console.log("El número de campos debe ser 5");
            res.sendStatus(400);
        }
        else {
            console.log("El nuevo dato se ha insertado correctamente");
            studentsAndalucia.insert(newStudentsAndalucia);

            res.sendStatus(201);
        }

    });

});


//DELETE /studentsAndalucia/

app.delete(API_PATH + "/students-andalucia", (req, res) => {

    studentsAndalucia.remove({});

    res.sendStatus(200);

});


//GET /studentsAndalucia/malaga/

app.get(API_PATH + "/students-andalucia/:city", (req, res) => {

    var city = req.params.city;

    studentsAndalucia.find({ "city": city}).toArray((err, studentsArray) => {
        console.log(studentsArray.length);
        if (err)
            console.log("Error: " + err);

        if (studentsArray.length == 0) {
            console.log("El recurso no se ha encontrado");
            res.sendStatus(404);
        }
        else {
            res.send(studentsArray.map((c) =>{
                delete c._id;
                return(c);
                
            }));
         console.log("Recurso encontrado y mostrado"); 
        }
    });

});

//GET /studentsAndalucia/malaga/2017

app.get(API_PATH + "/students-andalucia/:city/:year", (req, res) => {

    var city = req.params.city;
    var year = parseInt(req.params.year);

    studentsAndalucia.find({ "city": city, "year":year }).toArray((err, studentsArray) => {
        if (err){
            console.log("Error: " + err);
        }
        if(studentsArray.length >=1) {
            console.log("GET a un recurso. Recurso encontrado");
            res.send(studentsArray.map((c) =>{
                delete c._id;
                return(c);
            })[0]);
        }else {
            console.log("GET a un recurso. El recurso no se ha encontrado");
            res.sendStatus(404);
        }
    });

});

//PUT /studentsAndalucia/malaga/2017

app.put(API_PATH + "/students-andalucia/:city/:year", (req, res) => {

    var city = req.params.city;
    var year = parseInt(req.params.year);
    var updateStudents = req.body;

    studentsAndalucia.find({ "city": city,"year": year }).toArray((err, studentsArray) => {
        if (err){
            console.log(err);
        }
        if (studentsArray.length == 0) {
            console.log("PUT recurso no encontrado 404");
            res.sendStatus(404);

        }else if (!updateStudents.city || !updateStudents.year ||!updateStudents.eso || !updateStudents.high || !updateStudents.vocational 
            ||updateStudents.city != city || updateStudents.year != year|| Object.keys(updateStudents).length != 5 ){
                console.log("PUT recurso encontrado. Se intenta actualizar con campos no validos 400");
                res.sendStatus(400);
    
        }else {
                studentsAndalucia.updateOne({ "city": city}, { $set: updateStudents });
                studentsAndalucia.updateOne({ "year": year }, { $set: updateStudents });
                console.log("PUT realizado con exito");
                res.sendStatus(200);
    
        
        }
    });

});

//DELETE /studentsAndalucia/malaga/2017

app.delete(API_PATH + "/students-andalucia/:city/:year", (req, res) => {

    var city = req.params.city;
    var year = parseInt(req.params.year);

    studentsAndalucia.find({ "city": city, "year":year }).toArray((err, studentsArray) => {
        if (err){
            console.log(err);
        }
        if (studentsArray.length >=1) {
            studentsAndalucia.remove({ "city": city, "year":year });
            res.sendStatus(200);
            console.log("DELETE a un recurso. Recurso borrado");
        }else{
            res.sendStatus(404);
            console.log("DELETE a un recurso. Recurso no encontrado");
        }
    });
});

    //DELETE DE UN RECURSO CONCRETO
    app.delete(API_PATH + "/students-andalucia/:city", (req, res) => {
        var city = req.params.city;

        studentsAndalucia.find({ "city": city }).toArray((err, studentsArray) => {
            if (err) {
                console.log("Error :" + err);
            }
            else if (studentsArray.length == 0) {
                console.log("No se encuentra el recurso a eliminar");
                res.sendStatus(404);
            }
            else {
                console.log("/DELETE de un recurso concreto");
                res.sendStatus(200);
                studentsAndalucia.deleteMany({ "city": city });

            }
        });
    });

//POST incorrecto
app.post(API_PATH + "/students-andalucia/:city/:year", (req, res) => {
    res.sendStatus(405);
});

//PUT incorrecto
app.put(API_PATH + "/students-andalucia/", (req, res) => {
    res.sendStatus(405);
});

app.get("/api/v1/students-andalucia/docs/", (req, res) => {
    res.redirect("https://documenter.getpostman.com/view/6870023/S17qS957");
});

/*var buscador = function(city, year, eso, high, vocational);
app.get(API_PATH + "/students-andalucia" , function(req, res) {
   var city = req.params.city;
   
   if(){
       
   } 
});*/
    

}