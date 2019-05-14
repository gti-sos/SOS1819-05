describe("Check if data is loaded: ",function () {
    it("List shows more than 3 items", function (){
        browser.get("http://localhost:8080");
        var students = element.all(by.repeater("student in students"));
        expect(students.count()).toBeGreaterThan(3);
    });
});