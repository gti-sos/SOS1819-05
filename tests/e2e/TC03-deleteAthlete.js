describe('Check if a new athlete can be deleted', function() {
    it('List should decrease after the athlete deletion', function() {
        browser.get("http://localhost:8080/main.html#!/athletesApp");
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
