var express = require("express");
var bodyParser = require("body-parser");

const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb+srv://alvaro:rb1907@cluster0-amrh8.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });

//MONGO ALVARO
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

//MONGO MARTA
const uri_mvm = "mongodb+srv://test:test@sos-iyxd4.mongodb.net/test?retryWrites=true";
const client_mvm = new MongoClient(uri_mvm, { useNewUrlParser: true });

var studentsAndalucia;

client_mvm.connect(err => {
    studentsAndalucia = client_mvm.db("sos1819").collection("students-andalucia");
    console.log("Connected!");
});

//MONGO ENRIQUE
const uri_egv = "mongodb+srv://test:test@sos-brah9.mongodb.net/test?retryWrites=true";
const client_egv = new MongoClient(uri_egv, { useNewUrlParser: true });

var librariestats;

client_egv.connect(err => {
    librariestats = client_egv.db("sos1819").collection("libraries-stats");
    console.log("connected");
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

    if (_id != athlete._id /*|| Object.keys(athlete).length !== 6*/ ) {
        res.sendStatus(400);
        console.log(Date() + " - Hacking attemp!");
    }
    else {
        athletes.find({ "_id": parseInt(_id) }).toArray((err, athletesPut) => {
            if (err)
                console.log("Error :" + err);
            if (athletesPut.length == 0) {
                console.log("No hemos encontrado el elemento para actualizar");
                res.sendStatus(404);
            }
            else {
                athletes.update({ "_id": parseInt(_id) }, athlete, (err, numUpdated) => {
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
//LOADINITIALDATA
app.get(API_PATH + "/students-andalucia/loadInitialData", (req, res) => {

    var students = [{
        city: "almeria",
        year: 2017,
        eso: 31925,
        high: 10618,
        vocational: 1045
    }, {
        city: "cadiz",
        year: 2017,
        eso: 60230,
        high: 21499,
        vocational: 2219
    }, {
        city: "cordoba",
        year: 2017,
        eso: 34346,
        high: 12904,
        vocational: 1446
    }, {
        city: "granada",
        year: 2017,
        eso: 40821,
        high: 15536,
        vocational: 1564
    }, {
        city: "huelva",
        year: 2017,
        eso: 23958,
        high: 7638,
        vocational: 1020
    }, {
        city: "jaen",
        year: 2017,
        eso: 28106,
        high: 10759,
        vocational: 966
    }, {
        city: "malaga",
        year: 2017,
        eso: 72710,
        high: 25868,
        vocational: 2275
    }, {
        city: "sevilla",
        year: 2017,
        eso: 92661,
        high: 32807,
        vocational: 2457
    }];

    studentsAndalucia.find({}).toArray((err, studentsArray) => {

        if (studentsArray.length == 0) {
            studentsAndalucia.insert(students);
            res.sendStatus(200);
        }
        else {
            res.sendStatus(409);
        }
    });
});

//GET /studentsAndalucia/

app.get(API_PATH + "/students-andalucia", (req, res) => {

    studentsAndalucia.find({}).toArray((err, studentsArray) => {
        if (err)
            console.log("Error: " + err);

        res.send(studentsArray);
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

            res.sendStatus(409);

        }
        else if (!newStudentsAndalucia.city || !newStudentsAndalucia.year ||
            !newStudentsAndalucia.eso || !newStudentsAndalucia.high ||
            !newStudentsAndalucia.vocational || Object.keys(newStudentsAndalucia).length != 6) {

            res.sendStatus(400);
        }
        else {

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


//GET /studentsAndalucia/2017/malaga

app.get(API_PATH + "/students-andalucia/:city", (req, res) => {

    var city = req.params.city;

    studentsAndalucia.find({ "city": city }).toArray((err, studentsArray) => {
        if (err)
            console.log("Error: " + err);

        if (studentsArray == 0) {
            res.sendStatus(404);
        }
        else {
            res.send(studentsArray);
        }
    });

});

//PUT /studentsAndalucia/malaga

app.put(API_PATH + "/students-andalucia/:city", (req, res) => {

    var city = req.params.city;
    var updateStudents = req.body;


    studentsAndalucia.find({ "city": city }).toArray((err, studentsArray) => {
        if (err)
            console.log(err);


        if (studentsArray == 0) {

            res.sendStatus(404);

        }
        else if (!updateStudents.city || !updateStudents.year ||
            !updateStudents.eso || !updateStudents.high ||
            !updateStudents.vocational || Object.keys(updateStudents).length != 6 || req.body.city != city) {

            res.sendStatus(400);

        }
        else {

            studentsAndalucia.updateOne({ "city": city }, { $set: updateStudents });
            res.sendStatus(200);

        }
    });

});

//DELETE /studentsAndalucia/malaga

app.delete(API_PATH + "/students-andalucia/:city", (req, res) => {

    var city = req.params.city;

    studentsAndalucia.find({ "city": city }).toArray((err, studentsArray) => {
        if (err)
            console.log(err);

        if (studentsArray == 0) {

            res.sendStatus(404);

        }
        else {

            studentsAndalucia.deleteOne({ "city": city });
            res.sendStatus(200);

        }
    });
});

//POST incorrecto
app.post(API_PATH + "/students-andalucia/:city", (req, res) => {
    res.sendStatus(405);
});

//PUT incorrecto
app.put(API_PATH + "/students-andalucia/", (req, res) => {
    res.sendStatus(405);
});

app.get("/api/v1/students-andalucia/docs/", (req, res) => {
    res.redirect("https://documenter.getpostman.com/view/6870023/S17qS957");
});






/*---------------------------------------*/
/*------------API ENRIQUE------------------*/
/*---------------------------------------*/


//LOADINITIALDATA
app.get(API_PATH + "/libraries-stats/loadInitialData", (req, res) => {

    var libraries = [{
        city: "Almeria",
        year: 2017,
        number: 97,
        activities: 79,
        service: 96.62
    }, {
        city: "Cadiz",
        year: 2017,
        number: 76,
        activities: 58,
        service: 99.76
    }, {
        city: "Cordoba",
        year: 2017,
        number: 95,
        activities: 77,
        service: 99.80
    }, {
        city: "Granada",
        year: 2017,
        number: 122,
        activities: 97,
        service: 89.65
    }, {
        city: "Huelva",
        year: 2017,
        number: 81,
        activities: 70,
        service: 96.62
    }, {
        city: "Jaen",
        year: 2017,
        number: 105,
        activities: 69,
        service: 95.03
    }, {
        city: "Malaga",
        year: 2017,
        number: 152,
        activities: 121,
        service: 98.80
    }, {
        city: "Sevilla",
        year: 2017,
        number: 133,
        activities: 110,
        service: 98.77
    }];

    librariestats.find({}).toArray((err, librariesArray) => {
        if(err)
            console.log("Error " + err);
        if (librariesArray.length == 0) {
            librariestats.insert(libraries);
            res.sendStatus(200);
        }
        else {
            res.sendStatus(409);
        }
    });
});
// GET /libraries/
app.get(API_PATH + "/libraries-stats", (req, res) => {
    librariestats.find({}).toArray((err, librariesArray) => {
        if (err)
            console.log("Error: " + err);

        res.send(librariesArray);
    });
});
// POST /libraries/
app.post(API_PATH + "/libraries-stats", (req, res) => {

    var newLibrarieStats = req.body;
    var city = req.body.city;

    librariestats.find({ "city": city }).toArray((err, librariesArray) => {
        if (err)
            console.log(err);

        if (librariesArray != 0) {

            res.sendStatus(409);

        }
        else if (!newLibrarieStats.city || !newLibrarieStats.year ||
            !newLibrarieStats.number || !newLibrarieStats.activities ||
            !newLibrarieStats.service || Object.keys(newLibrarieStats).length != 6) {

            res.sendStatus(400);
        }
        else {

            librariestats.insert(newLibrarieStats);

            res.sendStatus(201);
        }
    });
});
// DELETE /libraries/
app.delete(API_PATH + "/libraries-stats", (req, res) => {

    librariestats.remove({});

    res.sendStatus(200);
});
// GET /libraries-stats/almeria
app.get(API_PATH + "/libraries-stats/:city", (req, res) => {

    var city = req.params.city;

    librariestats.find({ "city": city }).toArray((err, librariesArray) => {
        if (err)
            console.log("Error: " + err);

        if (librariesArray == 0) {
            res.sendStatus(404);
        }
        else {
            res.send(librariesArray);
        }
    });

});
// PUT /libraries-stats/almeria
app.put(API_PATH + "/libraries-stats/:city", (req, res) => {

    var city = req.params.city;
    var updateStats = req.body;


    librariestats.find({ "city": city }).toArray((err, librariesArray) => {
        if (err)
            console.log(err);


        if (librariesArray == 0) {

            res.sendStatus(404);

        }
        else if (!updateStats.city || !updateStats.year ||
            !updateStats.number || !updateStats.activities ||
            !updateStats.service || Object.keys(updateStats).length != 6 || req.body.city != city) {

            res.sendStatus(400);

        }
        else {

            librariestats.updateOne({ "city": city }, { $set: updateStats });
            res.sendStatus(200);

        }
    });
});
// DELETE /libraries/almeria
app.delete(API_PATH + "/libraries-stats/:city", (req, res) => {

    var city = req.params.city;

    librariestats.find({ "city": city }).toArray((err, librariesArray) => {
        if (err)
            console.log(err);

        if (librariesArray == 0) {

            res.sendStatus(404);

        }
        else {

            librariestats.deleteOne({ "city": city });
            res.sendStatus(200);
        }
    });
});
//POST incorrecto
app.post(API_PATH + "/libraries-stats/:city", (req, res) => {
    res.sendStatus(405);
    console.log("/POST no permitido");
});
//PUT incorrecto
app.put(API_PATH + "/libraries-stats/", (req, res) => {
    res.sendStatus(405);
    console.log("/PUT no permitido");
});


app.listen(port, () => {
    console.log("Magic server ready on port " + port);
});
