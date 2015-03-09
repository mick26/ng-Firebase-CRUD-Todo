
describe('My E-mail App', function() {
	it('should have a title', function() {
    	browser.get('http://localhost:8000/index-dev.html');

    	expect(browser.getTitle()).toEqual('Firebase Todo App');
  	});
});