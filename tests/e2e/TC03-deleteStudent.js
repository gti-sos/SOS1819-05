describe('Check if a new student can be deleted', function() {
    it('List should decrease after the student deletion', function() {
        browser.get("http://localhost:8080/");
        element.all(by.repeater("student in students"))
            .then(function(initialStudents) {
                element.all(by.css('[value="delete"]')).click();
                
                element.all(by.repeater("student in students"))
                    .then(function(finalStudents) {
                        expect(finalStudents.length).toEqual(0);
                    });
            });
    });
});