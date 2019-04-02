module.exports = function(app, API_PATH, athletes) {

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

    //DOCS
    app.get(API_PATH + "/athletes-performance-sport/docs", (req, res) => {
        res.redirect("https://documenter.getpostman.com/view/3889720/S17oyqMD");
    });


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
        
        athletes.find({ "city": athlete.city }).toArray((err, cityFiltro) => {
            if (err) {
                console.log("Error :" + err);
            }
            else {
                console.log("new /POST");
                if (Object.keys(athlete).length !== 6) {
                    res.sendStatus(400);
                }
                if (cityFiltro.length !== 0) {
                    res.sendStatus(409);
                }
                else {
                    res.sendStatus(201);
                    athletes.insert(athlete);
                }
            }
        });
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
                res.send(athletesList[0]);
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

        if (_id != athlete._id || Object.keys(athlete).length !== 6) {
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
};
