var express = require("express");
var bodyParser = require("body-parser");

const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb+srv://alvaro:rb1907@cluster0-amrh8.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });

var athletes;

client.connect(err => {
    if (err) {
        console.log("Error en la conexión con la base de datos");
    }
    else {
        athletes = client.db("sos1819-05").collection("athletes");
        console.log("Connected!");
    }
});

var app = express();
var API_PATH = "/api/v1";

app.use(bodyParser.json());

app.use("/", express.static(__dirname + "/public"));

var port = process.env.PORT || 8080;

/*---------------------------------------*/
/*------------API ÁLVARO------------------*/
/*---------------------------------------*/
var athletesPerformanceSport = [{
    _id: 1,
    city: "almeria",
    year: "2017",
    man: "63",
    woman: "37",
    total: "100"
}, {
    _id: 2,
    city: "cadiz",
    year: "2017",
    man: "87",
    woman: "36",
    total: "123"
}, {
    _id: 3,
    city: "cordoba",
    year: "2017",
    man: "50",
    woman: "37",
    total: "87"
}, {
    _id: 4,
    city: "granada",
    year: "2017",
    man: "95",
    woman: "51",
    total: "146"
}, {
    _id: 5,
    city: "huelva",
    year: "2017",
    man: "31",
    woman: "19",
    total: "50"
}, {
    _id: 6,
    city: "jaen",
    year: "2017",
    man: "30",
    woman: "16",
    total: "46"
}, {
    _id: 7,
    city: "malaga",
    year: "2017",
    man: "147",
    woman: "73",
    total: "220"
}, {
    _id: 8,
    city: "sevilla",
    year: "2017",
    man: "214",
    woman: "182",
    total: "396"
}];

//LOADINITIALDATA
app.get(API_PATH + "/athletes-performance-sport/loadInitialData", (req, res) => {
    athletes.find({}).toArray((err, athletesArray) => {
        if (err)
            console.log("Error: " + err);
        if (athletesArray.length == 0)
            console.log("/Load Initial Data");
            athletes.insertMany(athletesPerformanceSport);
            res.send(athletesPerformanceSport);
    });
});

//GET RECURSO COMPLETO
/*app.get(API_PATH + "/athletes-performance-sport", (req, res) => {
    console.log("/GET al recurso completo");
    athletes.find({}).toArray((err, athletesList) => {
        if (err)
            console.log("Error: " + err);
        res.send(athletesList);
    });
});*/

//GET RECURSO COMPLETO CON BÚSQUEDA Y PAGINACIÓN
app.get(API_PATH + "/athletes-performance-sport", function(req, res) {
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

    athletes.find(dbquery).skip(offset).limit(limit).toArray((err, athletesFilter) => {
        if (err) {
            console.error(" Error accesing DB");
            res.sendStatus(500);
            return;
        }

        if (athletesFilter.length == 0) {
            res.sendStatus(404);
        }
        else {
            res.send(athletesFilter.map((s) => {
                return s;
            }));
        }
    });
});

//POST AL RECURSO COMPLETO
app.post(API_PATH + "/athletes-performance-sport", (req, res) => {
    var athlete = req.body;
    console.log("new /POST");
    athletes.insert(athlete);
    res.sendStatus(201);
});

//PUT INCORRECTO
app.put(API_PATH + "/athletes-performance-sport", (req, res) => {
    res.sendStatus(405);
    console.log("/PUT no permitido");
});

//DELETE AL RECURSO COMPLETO
app.delete(API_PATH + "/athletes-performance-sport", (req, res) => {
    athletes.find({}).toArray((err, athletesDelete) => {
        if (err)
            console.log("Error" + err);
        if (athletesDelete.length == 0)
            console.log("No hay nada que borrar");
        console.log("/DELETE al recurso completo");
        res.send([]);
        athletes.deleteMany({});
    });
});

//GET A UN RECURSO CONCRETO
app.get(API_PATH + "/athletes-performance-sport/:city", (req, res) => {
    var city = req.params.city;

    athletes.find({ "city": city }).toArray((err, athletesList) => {
        if (err)
            console.log("Error :" + err);
        if (athletesList.length >= 1) {
            res.send(athletesList);
            console.log("/GET a un recurso concreto");
        }
        else {
            res.sendStatus(404);
        }
    });
});

//POST INCORRECTO
app.post(API_PATH + "/athletes-performance-sport/:city", (req, res) => {
    res.sendStatus(405);
    console.log("/POST no permitido");
});

//PUT DE UN RECURSO CONCRETO
app.put(API_PATH + "/athletes-performance-sport/:_id", (req, res) => {
    var _id = req.params._id;
    var athlete = req.body;

    if ( _id != athlete._id /*|| Object.keys(athlete).length !== 6*/) {
        res.sendStatus(400);
        console.log(Date() + " - Hacking attemp!");
    }
    else {
        athletes.find({"_id": parseInt(_id)}).toArray((err, athletesPut) => {
            if (err)
                console.log("Error :" + err);
            if (athletesPut.length == 0) {
                console.log("No hemos encontrado el elemento para actualizar");
                res.sendStatus(404);
            }
            else {
                athletes.update({"_id": parseInt(_id)}, athlete, (err, numUpdated) => {
                    if (err) {
                        console.log("Error " + err);
                    }
                    else {
                        console.log(" - updated" + numUpdated);
                        res.sendStatus(200);
                    }
                });
            }
        });
    }
});

//DELETE DE UN RECURSO CONCRETO
app.delete(API_PATH + "/athletes-performance-sport/:city", (req, res) => {
    var city = req.params.city;

    athletes.find({ "city": city }).toArray((err, athletesDel) => {
        if (err)
            console.log("Error :" + err);
        if (athletesDel.length == 0) {
            console.log("No se encuentra el recurso a eliminar");
            res.sendStatus(404);
        }
        else {
            console.log("/DELETE de un recurso concreto");
            res.sendStatus(200);
            athletes.deleteMany({ "city": city });
        }
    });
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
}, {
    city: "cadiz",
    year: "2017",
    esoStudent: "60.230",
    highSchoolStudent: "21.499",
    vocationalTraining: "2.219"
}, {
    city: "cordoba",
    year: "2017",
    esoStudent: "34.346",
    highSchoolStudent: "12.904",
    vocationalTraining: "1.446"
}, {
    city: "granada",
    year: "2017",
    esoStudent: "40.821",
    highSchoolStudent: "15.536",
    vocationalTraining: "1.564"
}, {
    city: "huelva",
    year: "2017",
    esoStudent: "23.958",
    highSchoolStudent: "7.638",
    vocationalTraining: "1.020"
}, {
    city: "jaen",
    year: "2017",
    esoStudent: "28.106",
    highSchoolStudent: "10.759",
    vocationalTraining: "966"
}, {
    city: "malaga",
    year: "2017",
    esoStudent: "72.710",
    highSchoolStudent: "25.868",
    vocationalTraining: "2.275"
}, {
    city: "sevilla",
    year: "2017",
    esoStudent: "92.661",
    highSchoolStudent: "32.807",
    vocationalTraining: "2.457"
}];

var studentsAndaluciaInitial = studentsAndalucia;

//LOADINITIALDATA
app.get(API_PATH + "/students-andalucia/loadInitialData", (req, res) => {
    if (studentsAndalucia.length == 0) {
        studentsAndalucia = studentsAndaluciaInitial;
        res.send(studentsAndalucia);
    }
    else {
        res.send(studentsAndalucia);
    }
});

//GET /studentsAndalucia/

app.get(API_PATH + "/students-andalucia", (req, res) => {
    res.send(studentsAndalucia);
});

//POST /studentsAndalucia/

app.post(API_PATH + "/students-andalucia", (req, res) => {
    var newStudentsAndalucia = req.body;

    studentsAndalucia.push(newStudentsAndalucia);

    res.sendStatus(201);

});


//DELETE /studentsAndalucia/

app.delete(API_PATH + "/students-andalucia", (req, res) => {

    studentsAndalucia = [];

    res.sendStatus(200);

});


//GET /studentsAndalucia/2017/malaga

app.get(API_PATH + "/students-andalucia/:city", (req, res) => {

    var city = req.params.city;

    var filteredStudents = studentsAndalucia.filter((c) => {
        return c.city == city;
    })

    if (filteredStudents.length >= 1) {
        res.send(filteredStudents[0]);
    }
    else {
        res.sendStatus(404);
    }

});

//PUT /studentsAndalucia/malaga

app.put(API_PATH + "/students-andalucia/:city", (req, res) => {

    var city = req.params.city;
    var updateStudents = req.body;
    var found = false;


    var updateStudents = studentsAndalucia.map((c) => {

        if (c.city == city) {
            found = true;
            return updateStudents;
        }
        else {
            return c;
        }

    });


    if (found == false) {
        res.sendStatus(404);
    }
    else {
        studentsAndalucia = updateStudents;
        res.sendStatus(200);
    }

});

//POST incorrecto
app.post(API_PATH + "/students-andalucia/:city", (req, res) => {
    res.sendStatus(405);
    console.log("/POST no permitido");
});

//PUT incorrecto
app.put(API_PATH + "/students-andalucia/", (req, res) => {
    res.sendStatus(405);
    console.log("/PUT no permitido");
});

//DELETE /studentsAndalucia/malaga

app.delete(API_PATH + "/students-andalucia/:city", (req, res) => {

    var city = req.params.city;
    var found = false;


    var updateStudents = studentsAndalucia.filter((c) => {

        if (c.city == city)
            found = true;


        return c.city != city;

    });


    if (found == false) {
        res.sendStatus(404);
    }
    else {
        studentsAndalucia = updateStudents;
        res.sendStatus(200);
    }

});



/*---------------------------------------*/
/*------------API ENRIQUE------------------*/
/*---------------------------------------*/

var libraries = [{
    city: "almeria",
    year: "2017",
    number: "97",
    activities: "79",
    service: "96,62"
}, {
    city: "cadiz",
    year: "2017",
    number: "76",
    activitites: "58",
    service: "99,76"
}];

// GET /libraries/

app.get(API_PATH + "/libraries-stats", (req, res) => {
    res.send(libraries);
});


// POST /libraries/

app.post(API_PATH + "/libraries-stats", (req, res) => {

    var newLlibraries = req.body;

    libraries.push(newLlibraries)

    res.sendStatus(201);
});


// DELETE /libraries/

app.delete(API_PATH + "/libraries-stats", (req, res) => {

    libraries = [];

    res.sendStatus(200);
});


// GET /libraries-stats/almeria

app.get(API_PATH + "/libraries-stats/:city", (req, res) => {

    var city = req.params.city;

    var filteredLibraries = libraries.filter((c) => {
        return c.city == city;
    })

    if (filteredLibraries.length >= 1) {
        res.send(filteredLibraries[0]);
    }
    else {
        res.sendStatus(404);
    }

});


// PUT /libraries-stats/almeria

app.put(API_PATH + "/libraries-stats/:city", (req, res) => {

    var city = req.params.city;
    var updatedLibraries = req.body;
    var found = false;

    var updatedLibraries = libraries.map((c) => {

        if (c.city == city) {
            found = true;
            return updatedLibraries;
        }
        else {
            return c;
        }

    });

    if (found == false) {
        res.sendStatus(404);
    }
    else {
        libraries = updatedLibraries;
        res.sendStatus(200);
    }

});


// DELETE /libraries/almeria

app.delete(API_PATH + "/libraries-stats/:city", (req, res) => {

    var city = req.params.city;
    var found = false;

    var updatedLibraries = libraries.filter((c) => {

        if (c.city == city)
            found = true;

        return c.city != city;
    });

    if (found == false) {
        res.sendStatus(404);
    }
    else {
        libraries = updatedLibraries;
        res.sendStatus(200);
    }

});


app.listen(port, () => {
    console.log("Magic server ready on port " + port);
});
