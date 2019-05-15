describe('Check if a new librarie can be created', function() {
    it('List should grow after the librarie creation', function() {
        browser.get("http://localhost:8080/main.html#!/librariesApp");
        element.all(by.repeater("librarie in libraries"))
            .then(function(initialLibraries) {
                element(by.model('newAthlete.city')).sendKeys('madrid');
                element(by.model('newAthlete.year')).sendKeys('2017');
                element(by.model('newAthlete.number')).sendKeys('110');
                element(by.model('newAthlete.activities')).sendKeys('33');
                element(by.model('newAthlete.service')).sendKeys('99');

                element(by.css('[value="add"]')).click('madrid');

                element.all(by.repeater("librarie in libraries"))
                    .then(function(finalLibraries) {
                        expect(finalLibraries.length).toEqual(initialLibraries.length + 1);
                    });
            });
    });
});
