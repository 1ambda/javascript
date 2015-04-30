
// requires modules
var sinon = require('sinon'),
    should = require('should');

// custom modules
var example = require('../lib/example'),
    once = example.once,
    createUser = example.createUser;

/*
 * A test py is a function that records
 * arguments, return value, the value of `this` and
 * exception thrown for all its calls.
 *
 * A test py can be an anomymous function or
 * it can wrap an existing function.
 */

describe('spy', function() {
  describe('spy()', function() {
    it('calls the original function only once', function() {
      var callback = sinon.spy();
      var proxy = once(callback);
      proxy();
      proxy();

      should(callback.called).be.equal(true);
      callback.calledOnce.should.be.equal(true);
      callback.callCount.should.be.eql(1);
    });
  });

  describe('User', function() {

    var user;

    beforeEach(function() {
      user = createUser();
      sinon.spy(user, 'register');
      sinon.spy(user, 'sendMail');
    });

    afterEach(function() {
      user.register.restore();
    })
    ;
    
    it('has property and its value is null when initialized ', function() {
      user.should.have.property("email");
      (user.email === null).should.be.equal(true);
    });

    it('should fill email property when register method is called', function() {
      (user.email === null).should.be.equal(true);
      user.register('lambda@domain.com');
      user.email.should.not.equal(null);
      user.register.calledOnce.should.eql(true);
      user.register.calledWith("lambda@domain.com").should.eql(true);
    });

    it('should call the callback passing error object when email is null', function() {
      var callback = sinon.spy(function(err) {
	throw err;
      });
      
      try {
	user.sendMail('help@domain.com', callback);
      } catch (err) {}
      callback.calledOnce.should.eql(true);
      callback.calledWith(new Error()).should.eql(true);
      user.sendMail.calledOn(user).should.eql(true);
      user.sendMail.threw().should.be.eql(true);
      
      try {
	user.sendMail('help@domain.com', callback);
      } catch (err) {}
      user.sendMail.calledTwice.should.equal(true);
      user.sendMail.alwaysThrew().should.be.eql(true);
      callback.calledOnce.should.eql(false); // called twice, so false
    });
  });
});
