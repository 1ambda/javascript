
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

exports.consumer = function() {
  
};
