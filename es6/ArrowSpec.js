// refs: http://es6-features.org/#StatementBodies

"use strict";

var should = require('should');

describe('Arrow', function() {
  it('provides expression bodies', function() {
    let evens = [2, 4, 6, 8];

    // run with `--harmony_arrow_functions` flag
    let odds = evens.map(x => x + 1);
    odds.should.containDeep([3, 5, 7, 9])
  })

  it('provides statements bodies', function() {

    function* range(start, end, step) {
      for (let i = start; i < end; i += step) {
        yield i;
      }
    }

    let nums = [];
    for (let n of range(1, 11, 1)) nums.push(n);

    let fives = [];

    nums.forEach(v => {
      if (v % 5 === 0) fives.push(v);
    })

    fives.should.containDeep([5, 10])
  })
})
