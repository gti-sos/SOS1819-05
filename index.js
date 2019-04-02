var express = require("express");
var bodyParser = require("body-parser");
var athletesApi = require("./athletes-performance-sport");
var secureAthletesApi = require("./secureAthletesPerformanceSport");

var app = express();
var API_PATH = "/api/v1";
var API_PATH_SECURE = "/api/v1/secure";

app.use(bodyParser.json());

app.use("/", express.static(__dirname + "/public"));

var port = process.env.PORT || 8080;


//CONEXIÓN BASE DE DATOS Y ARRANCAR PROGRAMA
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

        athletesApi(app, API_PATH, athletes);
        secureAthletesApi(app, API_PATH_SECURE, athletes);
        
        const uri_mvm = "mongodb+srv://test:test@sos-iyxd4.mongodb.net/test?retryWrites=true";
        const client_mvm = new MongoClient(uri_mvm, { useNewUrlParser: true });

        var studentsAndalucia;

        client_mvm.connect(err => {
            if (err) {
                console.log("Error en la conexión con la base de datos");
            }
            else {
                studentsAndalucia = client_mvm.db("sos1819").collection("students-andalucia");
                console.log("Connected!");

                const uri_egv = "mongodb+srv://test:test@sos-brah9.mongodb.net/test?retryWrites=true";
                const client_egv = new MongoClient(uri_egv, { useNewUrlParser: true });

                var librariestats;

                client_egv.connect(err => {
                    if (err) {
                        console.log("Error en la conexión con la base de datos");
                    }
                    else {
                        librariestats = client_egv.db("sos1819").collection("libraries-stats");
                        console.log("connected");

                        app.listen(port, () => {
                            console.log("Magic server ready on port " + port);
                        });
                    }
                });
            }
        });
    }
});


/*---------------------------------------*/
/*------------API MARTA------------------*/
/*---------------------------------------*/
//LOADINITIALDATA
app.get(API_PATH + "/students-andalucia/loadInitialData", (req, res) => {

    studentsAndalucia.find({}).toArray((err, studentsArray) => {
        if (studentsArray.length == 0) {
            studentsAndalucia.insert({city: "almeria", year: 2017, eso: 31925, high: 10618, vocational: 1045});
            studentsAndalucia.insert({city: "cadiz", year: 2017, eso: 60230, high: 21499, vocational: 2219});
            studentsAndalucia.insert({city: "cordoba", year: 2017, eso: 34346, high: 12904, vocational: 1446});
            studentsAndalucia.insert({city: "granada", year: 2017, eso: 40821,  high: 15536, vocational: 1564});
            studentsAndalucia.insert({city: "huelva", year: 2017, eso: 23958, high: 7638, vocational: 1020}); 
            studentsAndalucia.insert({city: "jaen", year: 2017, eso: 28106, high: 10759, vocational: 966});
            studentsAndalucia.insert({city: "malaga", year: 2017, eso: 72710, high: 25868, vocational: 2275});
            studentsAndalucia.insert({city: "sevilla", year: 2017, eso: 92661, high: 32807, vocational: 2457});
        
            res.sendStatus(201);
        }else{
            res.sendStatus(409);
        }
    });
});

//GET /studentsAndalucia/

app.get(API_PATH + "/students-andalucia", (req, res) => {

    studentsAndalucia.find({}).toArray((err, studentsArray) => {
        if (err)
            console.log("Error: " + err);
        
        res.send(studentsArray.map((c) =>{
            delete c._id;
            return(c);
        }));
        
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
            !newStudentsAndalucia.vocational || Object.keys(newStudentsAndalucia).length != 5) {

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


//GET /studentsAndalucia/malaga/

app.get(API_PATH + "/students-andalucia/:city", (req, res) => {

    var city = req.params.city;

    studentsAndalucia.find({ "city": city }).toArray((err, studentsArray) => {
        if (err)
            console.log("Error: " + err);

        if (studentsArray == 0) {
            res.sendStatus(404);
        }
        else {
            res.send(studentsArray.map((c) =>{
                delete c._id;
                return(c);
                
            }));
            
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
            !updateStudents.vocational || Object.keys(updateStudents).length != 5 || req.body.city != city) {

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
        if (err)
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
