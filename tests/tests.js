exports.config = {
    seleniumAddress: "http://localhost:4444/wd/hub",
    chromeOnly: true,
    specs: [
        "e2e/TC01-loadAthletes.js",
        "e2e/TC02-newAthlete.js",
<<<<<<< HEAD
        "e2e/TC03-deleteAthlete.js",
        
<<<<<<< HEAD
        
        "e2e/TC01-loadLibraries.js",
        "e2e/TC02-newLibraries.js",
        "e2e/TC03-deleteLibraries.js"
=======
          "e2e/TC01-loadLibraries.js",
        "e2e/TC02-newLibraries.js",
        "e2e/TC03-deleteLibraries.js"
    
>>>>>>> 227d609c865f144d6229736e27f33611ee3e5861
=======
        "e2e/TC03-deleteAthlete.js"
>>>>>>> ad4a349ea53f9290d6e45106b2b1f5e567aa5b60
    ]

};
