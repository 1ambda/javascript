
// requires modules
var sinon = require('sinon'),
    should = require('should');

// custom modules
var example = require('../lib/example'),
    once = example.once,
    createUser = example.createUser;

//  sinonjs.org/docs/#stubs

/*
 * Test stubs are functions (spies) with pre-programmed behavior.
 * They support the full test spy API in addition to
 * methods which can be used to alter the stub's behavior
 *
 * 1. To control a method's behavior from a test to force
      the code down a specfic path e.g error handling
 *
 * 2. To preven a specific method from being called directly
      e.g prevent from calling XMLHttpRequest
 */

describe('stub', function() {
  describe('stub basics', function() {
    it('should n+1 when the given argument is n', function() {
      var callback = sinon.stub();
      callback.withArgs(2).returns(3);
      callback.withArgs(3).returns(4);
      callback.withArgs(15).returns(16);
      callback.withArgs(-1).throws("TypeError");

      (callback() === undefined).should.be.eql(true);
      callback(2).should.be.eql(3);
      callback(3).should.be.eql(4);
      callback(15).should.be.eql(16);
      callback.callCount.should.be.eql(4);

      try {
	callback(-1);
      } catch(e) {}

      callback.threw("TypeError");
    });

    it('stub can return different values on consecutive calls', function() {
      var callback = sinon.stub();
      callback.withArgs(1).onCall(0).returns("first");
      callback.withArgs(2).onCall(0).returns("first");
      callback.withArgs(1).onCall(1).returns("twice");
      callback.returns(3);

      callback(1).should.eql("first");
      callback(2).should.eql("first");
      callback(1).should.eql("twice");
      callback().should.eql(3);
      callback().should.eql(3);
    });

    it('stub can be configured to call params', function() {

      var callback0 = sinon.spy();
      var callback1 = sinon.spy();
      var callback2 = sinon.spy();

      var stub = sinon.stub();
      stub(callback0, callback1, callback2); // save args as parameters
      
      stub.callArg(1); // call callback1
      callback0.called.should.be.eql(false);
      callback1.calledOnce.should.be.eql(true);
      callback2.called.should.be.eql(false);
      
      stub.callArg(0); // call callback0
      callback0.called.should.be.eql(true);
      callback1.calledOnce.should.be.eql(true);
      callback2.called.should.be.eql(false);
    });

    it('stub\'s yield can make invoking callback', function(done) {

      var from = "user@domain.com";
      var to = "notice@domain.com";
      var user = createUser();
      user.register(from);
      
      sinon.stub(user, 'sendMail').yields({
	from: from,
	to: to
      });

      user.sendMail(to, function(info) {
	info.should.have.property('from');
	info.from.should.eql(from);
	info.should.have.property('to');
	info.to.should.eql(to);
	done();
      });
    });
  });
});
