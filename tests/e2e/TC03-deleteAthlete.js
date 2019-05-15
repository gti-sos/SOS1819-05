describe('Check if a new athlete can be deleted', function() {
    it('List should decrease after the athlete deletion', function() {
        browser.get("https://sos1819-05.herokuapp.com/main.html#!/athletesApp");
        element.all(by.repeater("athlete in athletes"))
            .then(function(initialAthletes) {
                element.all(by.css('[value="delete"]')).click();

                element.all(by.repeater("athlete in athletes"))
                    .then(function(finalAthletes) {
                        expect(finalAthletes.length).toEqual(0);
                    });
            });
    });
});
