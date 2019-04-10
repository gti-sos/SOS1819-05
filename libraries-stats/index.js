module.exports = function(app, API_PATH, librariestats) {

    /*---------------------------------------*/
    /*------------API ENRIQUE------------------*/
    /*---------------------------------------*/
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

    //DOCS
    app.post(API_PATH + "/libraries-stats/docs", (req, res) => {
        res.redirect("https://documenter.getpostman.com/view/6920009/S17ozAkn");
    });
    //LOADINITIALDATA
    app.get(API_PATH + "/libraries-stats/loadInitialData", (req, res) => {
        librariestats.find({}).toArray((err, librariesArray) => {
            if (err) {
                console.log("Error: " + err);
            }
            else if (librariesArray.length == 0) {
                console.log("/Load Initial Data");
                res.send(libraries.map((c) => {
                    delete c._id;
                    return c;
                }));
                librariestats.insertMany(libraries);
            }
            else {
                res.send(librariesArray.map((c) => {
                    delete c._id;
                    return c;
                }));

            }
        });
    });

    // GET Recurso Completo BUSQUEDA Y PAGINACION
    app.get(API_PATH + "/libraries-stats", function(req, res) {
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

        librariestats.find(dbquery).skip(offset).limit(limit).toArray((err, librariesFilter) => {
            if (err) {
                console.error(" Error accesing DB");
                res.sendStatus(500);
                return;
            }
            else if (librariesFilter.length == 0) {
                res.send([]);
            }
            else {
                res.send(librariesFilter.map((s) => {
                    delete s._id;
                    return s;
                }));
            }
        });
    });

    // POST Recurso Completo
    app.post(API_PATH + "/libraries-stats", (req, res) => {
        var newLibrariesStats = req.body;
        var city = req.body.city;
    
        librariestats.find({ "city": city }).toArray((err, librariesArray) => {
            if (err)
                console.log(err);
    
            if (librariesArray != 0) {
                console.log("Conflicto porque el objeto ya existe");
                res.sendStatus(409);
    
            }
            else if (!newLibrariesStats.city || !newLibrariesStats.year ||
                !newLibrariesStats.number || !newLibrariesStats.activities ||
                !newLibrariesStats.service || Object.keys(newLibrariesStats).length != 5) {
    
                console.log("El número de campos debe ser 5");
                res.sendStatus(400);
            }
            else {
                console.log("El nuevo dato se ha insertado correctamente");
                librariestats.insert(newLibrariesStats);
    
                res.sendStatus(201);
            }
    
        });
    
    });

    //PUT INCORRECTO
    app.put(API_PATH + "/libraries-stats", (req, res) => {
        res.sendStatus(405);
        console.log("/PUT no permitido");
    });

    // DELETE Recurso Completo
    app.delete(API_PATH + "/libraries-stats", (req, res) => {

        librariestats.remove({});

        res.sendStatus(200);
    });

    // GET Recurso Concreto
    app.get(API_PATH + "/libraries-stats/:city", (req, res) => {
        var city = req.params.city;

        librariestats.find({ "city": city }).toArray((err, librariesList) => {
            if (err) {
                console.log("Error :" + err);
            }
            else if (librariesList.length >= 1) {
                console.log("/GET a un Recurso Concreto");
                res.send(librariesList.map((c) => {
                    delete c._id;
                    return c;
                })[0]);
            }
            else {
                res.sendStatus(404);
            }
        });
    });
    
    //GET busqueda por 2 parametros

    app.get(API_PATH + "/libraries-stats/:city/:year", (req, res) => {

        var city = req.params.city;
        var year = req.params.year;

        librariestats.find({ "city": city, "year":year }).toArray((err, librariesArray) => {
            if (err)
                console.log("Error: " + err);

            if (librariesArray == 0) {
                res.sendStatus(404);
            }
            else {
                res.send(librariesArray.map((c) =>{
                    delete c._id;
                    return(c);
                
                }));
            }
        });
    });



    //POST INCORRECTO
    app.post(API_PATH + "/libraries-stats/:city", (req, res) => {
        res.sendStatus(405);
        console.log("/POST no permitido");
    });

    // PUT Recurso Concreto
    app.put(API_PATH + "/libraries-stats/:city", (req, res) => {
        var city = req.params.city;
        var librarie = req.body;

        if (city != librarie.city || Object.keys(librarie).length !== 5) {
            res.sendStatus(400);
            console.log(Date() + " - Hacking attemp!");
        }
        else {
            librariestats.find({ "city": city }).toArray((err, librariesPut) => {
                if (err) {
                    console.log("Error :" + err);
                }
                else if (librariesPut.length == 0) {
                    console.log("No hemos encontrado el elemento para actualizar");
                    res.sendStatus(404);
                }
                else {
                    librariestats.update({ "city": city }, librarie, (err, numUpdated) => {
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
    // DELETE Recurso Concreto
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
};
