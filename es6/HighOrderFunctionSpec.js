// ref: http://colin-dumitru.github.io/functional-programming/javascript/tutorial/2014/12/28/functional_operations_in_es6.html
"use strict";

var should = require('should');

describe('High Order Function', function() {
  it('#reduce', function() {
    let result = [1, 2, 3, 4, 5].reduce((x, y) => x + y);
    should(result).be.equal(15);
  })

  it('#foldLeft', function() {
    let result = [1, 2, 3, 4, 5].reduce((l, r) => l + r, 20);
    result.should.equal(35);
  })

  it('#foldRight', function() {


    let result1 = [1, 2, 3, 4, 5].reduceRight((l, r) => l + r, 10);
    result1.should.equal(25);

    let result2 = [1, 2, 3, 4, 5].reduceRight((l, r) => (l.push(r), l), []);
    result2.should.containDeep([5, 4, 3, 2, 1]);

  })

  it('#filter', function() {
    let nats = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    let evens = nats.filter(x => x % 2 === 0);
    evens.should.containDeep([2, 4, 6, 8, 10]);

    let odds = evens.map(x => x - 1);
    odds.should.containDeep([1, 3, 5, 7, 9]);
  })

})
