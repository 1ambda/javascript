
// http://sinonjs.org/
exports.once = function(callback) {

  var returnValue, called = false;

  return function() {
    if (!called) {
      called = true;
      returnValue = callback.apply(this, arguments);
    }

    return returnValue;
  };
};

function User() {
  this.email = null;
}

User.prototype.register = function (email) {
  this.email = email;
};

User.prototype.sendMail = function(to, callback) {
  if (this.email === null) {
    callback(new Error('no registered email'));
  } else {
    callback(this.email);
  }
};

exports.createUser = function() {
  return new User();
};
