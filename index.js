var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var request = require("request");
var cors = require("cors");

//ALVARO
var athletesApi = require("./athletes-performance-sport");
var secureAthletesApi = require("./secureAthletesPerformanceSport");

//MARTA
var studentsAPI = require("./students-andalucia");
var secureStudentsAPI = require("./secureStudentsAndalucia");

//ENRIQUE
var librariesAPI = require("./libraries-stats");
var secureLibrariesAPI = require("./secureLibrariesStats");

var app = express();
var API_PATH = "/api/v1";
var API_PATH_SECURE = "/api/v1/secure";

app.use(bodyParser.json());

app.use("/", express.static(path.join(__dirname, "public")));

app.use(cors());

var port = process.env.PORT || 8080;


//CONEXIÓN BASE DE DATOS Y ARRANCAR PROGRAMA
const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb+srv://alvaro:rb1907@cluster0-amrh8.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });

var athletes;

/*-------------------------------------------------------PROXY ALVARO---------------------------------------------------------------------*/
var proxyAlvaro = "/api/v1/athletes-performance-sport/proxy";
var apiServerHostAlvaro = "https://sos1819-05.herokuapp.com/api/v1/athletes-performance-sport";

app.use(proxyAlvaro, function(req, res) {
    console.log('piped: ' + apiServerHostAlvaro);
    req.pipe(request(apiServerHostAlvaro)).pipe(res);
});

/*-------------------------------------------------------PROXY MARTA---------------------------------------------------------------------*/

var proxyMarta = "/api/v1/students-andalucia/proxy";
var apiServerHostMarta = "https://sos1819-05.herokuapp.com/api/v1/students-andalucia";

app.use(proxyMarta, function(req, res) {
    console.log('piped: ' + apiServerHostMarta);
    req.pipe(request(apiServerHostMarta)).pipe(res);
});

/*-------------------------------------------------------PROXY ENRIQUE---------------------------------------------------------------------*/
var proxyEnrique = "/api/v1/libraries-stats/proxy";
var apiServerHostEnrique = "https://sos1819-05.herokuapp.com/api/v1/libraries-stats";

app.use(proxyEnrique, function(req, res) {
    console.log('piped: ' + apiServerHostEnrique);
    req.pipe(request(apiServerHostEnrique)).pipe(res);
});


/*----------------------------------------------------------------------------------------------------------------------------------------*/
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


                studentsAPI(app, API_PATH, studentsAndalucia);
                secureStudentsAPI(app, API_PATH_SECURE, studentsAndalucia);

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

                        librariesAPI(app, API_PATH, librariestats);
                        secureLibrariesAPI(app, API_PATH_SECURE, librariestats);

                        app.listen(port, () => {
                            console.log("Server ready on port: " + port);
                        }).on("error", (e) => {
                            console.log("Server NOT READY: " + e);
                        });
                    }
                });
            }
        });
    }
});
