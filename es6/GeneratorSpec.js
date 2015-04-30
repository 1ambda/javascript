var should = require('should');
var assert = require('assert');

// ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*
describe('Generator', function() {
  it('should generate values imperatively', function() {
    function* idxGen() {
      var index = 0;

      while (index < 3) {
        yield index++;
      }
    }

    var gen = idxGen();
    assert.equal(1, 1);

    gen.next().value.should.be.equal(0)
    gen.next().value.should.be.equal(1)
    gen.next().value.should.be.equal(2)
    should(gen.next().value).be.undefined;
  })

  it('should be able to use other generators', function() {
    function* generator2(i) {
      yield i + 1;
      yield i + 2;
      yield i + 3;
    }

    function* generator1(i) {
      yield i;
      yield* generator2(i);
      yield i + 10;
    }

    var gen = generator1(10);

    gen.next().value.should.be.equal(10);
    gen.next().value.should.be.equal(11);
    gen.next().value.should.be.equal(12);
    gen.next().value.should.be.equal(13);
    gen.next().value.should.be.equal(20);
  })
})

