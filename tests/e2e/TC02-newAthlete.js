describe('Check if a new athlete can be created', function() {
    it('List should grow after the athlete creation', function() {
        browser.get("https://sos1819-05.herokuapp.com/main.html#!/athletesApp");
        element.all(by.repeater("athlete in athletes"))
            .then(function(initialAthletes) {
                element(by.model('newAthlete.city')).sendKeys('barcelona');
                element(by.model('newAthlete.year')).sendKeys('2017');
                element(by.model('newAthlete.man')).sendKeys('100');
                element(by.model('newAthlete.woman')).sendKeys('200');
                element(by.model('newAthlete.total')).sendKeys('300');

                element(by.css('[value="add"]')).click('barcelona');

                element.all(by.repeater("athlete in athletes"))
                    .then(function(finalAthletes) {
                        expect(finalAthletes.length).toEqual(initialAthletes.length + 1);
                    });
            });
    });
});
