module.exports = function(app, API_PATH_SECURE, athletes) {

    //SECURE
    var apikeyObject = {};
    var api_key = "sos1819-05";

    apikeyObject.checkApiKey = function(req, res) {
        if (!req.query.apikey) {
            console.error('WARNING: No apikey was sent!');
            res.sendStatus(401);
            return false;
        }
        if (req.query.apikey !== api_key) {
            console.error('WARNING: Incorrect apikey was used!');
            res.sendStatus(403);
            return false;
        }
        return true;
    };

    /*---------------------------------------*/
    /*------------API ÁLVARO------------------*/
    /*---------------------------------------*/
    var athletesPerformanceSport = [{
        city: "almeria",
        year: 2017,
        man: 63,
        woman: 37,
        total: 100
    }, {
        city: "cadiz",
        year: 2017,
        man: 87,
        woman: 36,
        total: 123
    }, {
        city: "cordoba",
        year: 2017,
        man: 50,
        woman: 37,
        total: 87
    }, {
        city: "granada",
        year: 2017,
        man: 95,
        woman: 51,
        total: 146
    }, {
        city: "huelva",
        year: 2017,
        man: 31,
        woman: 19,
        total: 50
    }, {
        city: "jaen",
        year: 2017,
        man: 30,
        woman: 16,
        total: 46
    }, {
        city: "malaga",
        year: 2017,
        man: 147,
        woman: 73,
        total: 220
    }, {
        city: "sevilla",
        year: 2017,
        man: 214,
        woman: 182,
        total: 396
    }];

    //DOCS
    app.get(API_PATH_SECURE + "/athletes-performance-sport/docs", (req, res) => {
        if (!apikeyObject.checkApiKey(req, res)) return;

        res.redirect("https://documenter.getpostman.com/view/3889720/S17oyqMD");
    });

    //LOADINITIALDATA
    app.get(API_PATH_SECURE + "/athletes-performance-sport/loadInitialData", (req, res) => {
        if (!apikeyObject.checkApiKey(req, res)) return;

        athletes.find({}).toArray((err, athletesArray) => {
            if (err) {
                console.log("Error: " + err);
            }
            else if (athletesArray.length == 0) {
                console.log("/Load Initial Data");
                res.send(athletesPerformanceSport.map((c) => {
                    delete c._id;
                    return c;
                }));
                athletes.insertMany(athletesPerformanceSport);
            }
            else {
                res.send(athletesArray.map((c) => {
                    delete c._id;
                    return c;
                }));

            }
        });
    });

    //GET RECURSO COMPLETO CON BÚSQUEDA Y PAGINACIÓN
    app.get(API_PATH_SECURE + "/athletes-performance-sport", function(req, res) {
        if (!apikeyObject.checkApiKey(req, res)) return;

        var dbquery = {};
        let offset = 0;
        let limit = Number.MAX_SAFE_INTEGER;
        delete req.query.apikey;

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
            else if (athletesFilter.length == 0) {
                res.send([]);
            }
            else {
                res.send(athletesFilter.map((s) => {
                    delete s._id;
                    return s;
                }));
            }
        });
    });

    //POST AL RECURSO COMPLETO
    app.post(API_PATH_SECURE + "/athletes-performance-sport", (req, res) => {
        if (!apikeyObject.checkApiKey(req, res)) return;

        var athlete = req.body;

        athletes.find({ "city": athlete.city }).toArray((err, cityFiltro) => {
            if (err) {
                console.log("Error :" + err);
            }
            else {
                console.log("new /POST");
                if (Object.keys(athlete).length !== 5) {
                    res.sendStatus(400);
                }
                else if (cityFiltro.length !== 0) {
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
    app.put(API_PATH_SECURE + "/athletes-performance-sport", (req, res) => {
        if (!apikeyObject.checkApiKey(req, res)) return;

        res.sendStatus(405);
        console.log("/PUT no permitido");
    });

    //DELETE AL RECURSO COMPLETO
    app.delete(API_PATH_SECURE + "/athletes-performance-sport", (req, res) => {
        if (!apikeyObject.checkApiKey(req, res)) return;

        athletes.find({}).toArray((err, athletesDelete) => {
            if (err) {
                console.log("Error" + err);
            }
            else if (athletesDelete.length == 0) {
                console.log("No hay nada que borrar");
                res.sendStatus(404);
            }
            else {
                console.log("/DELETE al recurso completo");
                res.send([]);
                athletes.deleteMany();

            }
        });
    });

    //GET A UN RECURSO CONCRETO
    app.get(API_PATH_SECURE + "/athletes-performance-sport/:city", (req, res) => {
        if (!apikeyObject.checkApiKey(req, res)) return;

        var city = req.params.city;

        athletes.find({ "city": city }).toArray((err, athletesList) => {
            if (err) {
                console.log("Error :" + err);
            }
            else if (athletesList.length >= 1) {
                console.log("/GET a un recurso concreto");
                res.send(athletesList.map((c) => {
                    delete c._id;
                    return c;
                })[0]);
            }
            else {
                res.sendStatus(404);
            }
        });
    });

    //GET A VARIOS RECURSOS
    app.get(API_PATH_SECURE + "/athletes-performance-sport/:city/:year", (req, res) => {
        if (!apikeyObject.checkApiKey(req, res)) return;

        var city = req.params.city;
        var year = req.params.year;

        athletes.find({ "city": city, "year": parseInt(year) }).toArray((err, athletesList) => {
            if (err) {
                console.log("Error :" + err);
            }
            else if (athletesList.length >= 1) {
                console.log("/GET a un recurso concreto");
                res.send(athletesList.map((c) => {
                    delete c._id;
                    return c;
                })[0]);
            }
            else {
                res.sendStatus(404);
            }
        });
    });

    //POST INCORRECTO
    app.post(API_PATH_SECURE + "/athletes-performance-sport/:city", (req, res) => {
        if (!apikeyObject.checkApiKey(req, res)) return;

        res.sendStatus(405);
        console.log("/POST no permitido");
    });

    //PUT DE UN RECURSO CONCRETO
    app.put(API_PATH_SECURE + "/athletes-performance-sport/:city", (req, res) => {
        if (!apikeyObject.checkApiKey(req, res)) return;

        var city = req.params.city;
        var athlete = req.body;

        if (city != athlete.city || Object.keys(athlete).length !== 5) {
            res.sendStatus(400);
            console.log(Date() + " - Hacking attemp!");
        }
        else {
            athletes.find({ "city": city }).toArray((err, athletesPut) => {
                if (err) {
                    console.log("Error :" + err);
                }
                else if (athletesPut.length == 0) {
                    console.log("No hemos encontrado el elemento para actualizar");
                    res.sendStatus(404);
                }
                else {
                    athletes.update({ "city": city }, athlete, (err, numUpdated) => {
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

    //PUT DE VARIOS RECURSOS
    app.put(API_PATH_SECURE + "/athletes-performance-sport/:city/:year", (req, res) => {
        if (!apikeyObject.checkApiKey(req, res)) return;

        var city = req.params.city;
        var year = req.params.year;
        var athlete = req.body;

        if (city != athlete.city || year != athlete.year || Object.keys(athlete).length !== 5) {
            res.sendStatus(400);
            console.log(Date() + " - Hacking attemp!");
        }
        else {
            athletes.find({ "city": city, "year": parseInt(year) }).toArray((err, athletesPut) => {
                if (err) {
                    console.log("Error :" + err);
                }
                else if (athletesPut.length == 0) {
                    console.log("No hemos encontrado el elemento para actualizar");
                    res.sendStatus(404);
                }
                else {
                    athletes.update({ "city": city, "year": parseInt(year) }, athlete, (err, numUpdated) => {
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
    app.delete(API_PATH_SECURE + "/athletes-performance-sport/:city", (req, res) => {
        if (!apikeyObject.checkApiKey(req, res)) return;

        var city = req.params.city;

        athletes.find({ "city": city }).toArray((err, athletesDel) => {
            if (err) {
                console.log("Error :" + err);
            }
            else {
                if (athletesDel.length == 0) {
                    console.log("No se encuentra el recurso a eliminar");
                    res.sendStatus(404);
                }
                else {
                    console.log("/DELETE de un recurso concreto");
                    res.sendStatus(200);
                    athletes.deleteMany({ "city": city });
                }
            }
        });
    });
};
