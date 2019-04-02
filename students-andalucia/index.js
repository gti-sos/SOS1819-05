module.exports = function(app, API_PATH, studentsAndalucia){
    
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

    studentsAndalucia.find({ "city": city}).toArray((err, studentsArray) => {
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

//GET /studentsAndalucia/malaga/2017

app.get(API_PATH + "/students-andalucia/:city/:year", (req, res) => {

    var city = req.params.city;
    var year = req.params.year;

    studentsAndalucia.find({ "city": city, "year":year }).toArray((err, studentsArray) => {
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

app.put(API_PATH + "/students-andalucia/:city/:year", (req, res) => {

    var city = req.params.city;
    var year = req.params.year;
    var updateStudents = req.body;


    studentsAndalucia.find({ "city": city,"year": year }).toArray((err, studentsArray) => {
        if (err){
            console.log(err);

        }
        if (studentsArray.length == 0) {

            res.sendStatus(404);

        }else{
            if (!updateStudents.city || !updateStudents.year ||!updateStudents.eso || !updateStudents.high ||
                !updateStudents.vocational || Object.keys(updateStudents).length >6 ||
                updateStudents.city != city || updateStudents.year != year){
    
                res.sendStatus(400);
    
            }else {
                studentsAndalucia.updateOne({ "city": city }, { $set: updateStudents });
                studentsAndalucia.updateOne({ "year": year }, { $set: updateStudents });
                res.sendStatus(200);
    
            }
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

    
    
    
}