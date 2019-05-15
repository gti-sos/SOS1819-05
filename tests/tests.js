exports.config = {
    seleniumAddress: "http://localhost:4444/wd/hub",
    chromeOnly: true,
    specs: [
        "e2e/TC01-loadAthletes.js",
        "e2e/TC02-newAthlete.js",
        "e2e/TC03-deleteAthlete.js",
        
          "e2e/TC01-loadLibraries.js",
        "e2e/TC02-newLibraries.js",
        "e2e/TC03-deleteLibraries.js"
    
    ]

};
