
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
    callback({
      "from": this.email,
      "to": to
    });
  }
};

exports.createUser = function() {
  return new User();
};

function jQuery (storage) {
  this.storage = storage;
}

// simplified ajax interface
jQuery.prototype.get = function(url, callback) {
  if (this.storage[url] === undefined) {
    callback(undefined, 404);
  }
  else {
    callback(this.storage[url], 200);
  }
};

jQuery.prototype.remove = function(url, callback) {
  if (this.storage[url] === undefined) {
    callback(undefined, 404);
  } else {
    this.stroage[url] = undefined;
    callback(undefined, 200);
  }
};

jQuery.prototype.post = function(url, data, callback) {
  if (this.storage[url] === undefined) {
    this.storage[url] = data;
    callback(undefined, 201);
  }
  else {
    this.storage[url] = data;
    callback(undefined, 200);
  }
};

jQuery.prototype.put = jQuery.prototype.post;

jQuery.prototype.ajax = function(type, url, data, callback) {
  type = type.toLowerCase();

  var response;
  var statusCode;

  switch(type) {
    case "get": this.get(url, callback); break;
    case "delete": this.remove(url, callback); break;
    case "put":
    case "post": this.post(url, data, callback); break;
    // default: fail(new Error('AJAX Type Error'));
  }
};

var $ = new jQuery();
exports.createjQuery = function(storage) {
  return new jQuery(storage);
};
