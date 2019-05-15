describe('Data is loaded', function() {
    it('should show a bunch of data', function() {
        browser.get("https://sos1819-05.herokuapp.com/main.html#!/athletesApp");
        var athletes = element.all(by.repeater("athlete in athletes"));
        expect(athletes.count()).toBeGreaterThan(0);
    });
});
