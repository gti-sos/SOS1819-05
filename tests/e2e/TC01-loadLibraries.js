describe("Check if data is loaded: ",function () {
    it("List shows more than 3 items", function (){
        browser.get("http://localhost:8080");
        var libraries = element.all(by.repeater("librarie in libraries"));
        expect(libraries.count()).toBeGreaterThan(3);
    });
});