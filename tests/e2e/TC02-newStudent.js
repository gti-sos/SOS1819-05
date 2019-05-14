describe('Check if a new athlete can be created', function() {
    it('List should grow after the athlete creation', function() {
        browser.get("http://localhost:8080/");
        element.all(by.repeater("student in students"))
            .then(function(initialStudents) {
                element(by.model('newStudent.city')).sendKeys('barcelona');
                element(by.model('newStudent.year')).sendKeys('2017');
                element(by.model('newStudent.eso')).sendKeys('1');
                element(by.model('newStudent.woman')).sendKeys('2');
                element(by.model('newStudent.total')).sendKeys('3');

                element(by.css('[value="add"]')).click('barcelona');

                element.all(by.repeater("student in students"))
                    .then(function(finalStudents) {
                        expect(finalStudents.length).toEqual(initialStudents.length + 1);
                    });
            });
    });
});