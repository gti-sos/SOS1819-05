describe('Check if a new librarie can be deleted', function() {
    it('List should decrease after the librarie deletion', function() {
        browser.get("http://localhost:8080/main.html#!/librariesApp");
        element.all(by.repeater("librarie in libraries"))
            .then(function(initialLibraries) {
                element.all(by.css('[value="delete"]')).click();
                
                element.all(by.repeater("librarie in libraries"))
                    .then(function(finalLibraries) {
                        expect(finalLibraries.length).toEqual(0);
                    });
            });
    });
});
