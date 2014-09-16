
// requires modules
var sinon = require('sinon'),
    should = require('should');

// custom modules
var example = require('../lib/example'),
    once = example.once,
    createUser = example.createUser,
    createjQuery = example.createjQuery;

/* http://sinonjs.org/docs/#mocks
 *
 * Mocks and mock expectations are fake methods(like spies)
 * with pre-programmed behavior(like stubs)
 * as well as pre-programmed expectations.
 * A mock will fail your test if it is not used as expected
 *
 * Mocks should only be used for the mthod unser test.
 * In every unit test, there should be one unit under test.
 * If you want to control how your unit is being used and like
 * stating expectations up front, use a mock.
 *
 * Mocks come with built-in expectations that may fail your test.
 * Thus, they enforce implementation details. The rule of thumb is :
 * If you wouldn't add an assertion for some specific call, dont' mock it
 * Use a stub instead. In general you should never have more than one mock
 * in a single test
 */

describe('mock.js', function() {
  describe('Fake jQuery', function() {
    var storage = {id: 3};
    var $ = createjQuery(storage);

    it('get should return 404 when trying to get a resource which doen not exists', function(done) {
      $.ajax("get", "rs1", "", function(res, status) {
	should.not.exist(res);
	status.should.eql(404);
	done();
      });
    });

    it('get should return 200 on a existing resource', function() {
      $.ajax("get", "id", "", function(res, status) {
	should.exists(res);
	res.should.eql(3);
	status.should.eql(200);
      });
    });

    it('post should return 201 updating not existing resources', function(done) {
      $.ajax("POST", "name", "lambda", function(res, status) {
	should.not.exist(res);
	status.should.eql(201);
	should(storage).have.property("name", "lambda");
	done();
      });
    });

    it('post should return 200 when updating a existing resource', function(done) {
      $.ajax("POST", "id", "4", function(res, status) {
	should.not.exists(res);
	status.should.eql(200);
	should(storage).have.property("id", 4);
	done();
      });
    });
  });

  describe("mock api", function() {
    var $;
    var storage;

    beforeEach(function() {
      storage = {};
      $ = createjQuery(storage);
    });

    it('POST ajax should call post method', function() {
      var mock = sinon.mock($);
      var callback = function (){};
      mock.expects("post").withArgs("id", 3, callback);
      mock.expects("get").never();
      mock.expects("remove").never();

      // mocks enfoces implementation details
      $.ajax("post", "id", 3, callback);
      
      // this is where mock can make test fail.
      mock.verify();
    });
  });

  describe("stub api", function() {
    var $;
    var storage;

    beforeEach(function() {
      storage = {};
      $ = createjQuery(storage);
    });
    
  });
});
