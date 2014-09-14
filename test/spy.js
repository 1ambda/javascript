
// requires modules
var sinon = require('sinon'),
    should = require('should');

// custom modules
var once = require('../lib/example').once;

/*
 * A test py is a function that records
 * arguments, return value, the value of `this` and
 * exception thrown for all its calls.
 *
 * A test py can be an anomymous function or
 * it can wrap an existing function.
 */

describe('spy', function() {
  it('calls the original function only once', function() {
    var callback = sinon.spy();
    var proxy = once(callback);
    proxy();
    proxy();

    should(callback.called).be.equal(true);
    callback.calledOnce.should.be.equal(true);
    callback.callCount.should.be.eql(1);
  });

  it('calls callback', function() {
    
  });
});
