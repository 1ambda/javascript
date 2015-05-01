'use strict';

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

  it('is capable of modelding pytonh\'s range() ', function() {
    function* range(start, end, step) {
      while (start < end) {
        yield start;
        start += step;
      }
    }

    var arr = [];

    for (let i of range(0, 10, 2)) {
      arr.push(i);
    }

    arr.should.containDeep([0, 2, 4, 6, 8]);
  })

  it('can provide infinite sequence', function() {
    function* nat() {
      let i = 1;
      while (true) {
        yield i++;
      }
    }

    var arr = [];
    var gen = nat();

    for(let j = 0; j < 5; j++) {
      arr.push(gen.next().value)
    }

    arr.should.containDeep([1, 2, 3, 4, 5])
  })

  it('is possible to make argument generators', function() {

    function* argGenerator() {
      for(let i = 0; i < arguments.length; i++) {
        yield arguments[i];
      }
    }

    let fruits = ['apple', 'banana', 'grape']
    let gen = argGenerator('apple', 'banana', 'grape');

    let arr = [];

    for (let fruit of gen) {
      arr.push(fruit);
    }

    arr.should.containDeep(['apple', 'banana', 'grape'])
  })

  it('is possible to model take()', function() {
    function* natural() {
      let n = 1;

      while (true) {
        yield n;
        n += 1;
      }
    }

    let natGen = natural();

    let one = natGen.next().value;
    should(one).be.equal(1)

    function* take(iterable, howMany) {
      let i = 0;

      for (let taken of iterable) {
        if (i++ === howMany) return;
        yield taken;
      }
    }

    let natsUntil5 = [];

    for (let value of take(natural(), 5))
      natsUntil5.push(value)

    natsUntil5.should.containDeep([1, 2, 3, 4, 5])
  })
})

