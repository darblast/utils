import { expect } from 'chai';

import * as Utilities from '../dist/utils.js';

describe('Utilities', function () {
  describe('range', function () {
    it('returns an empty array', function () {
      expect(Utilities.range(0)).to.eql([]);
    });

    it('ranges from 0 to 0', function () {
      expect(Utilities.range(1)).to.eql([0]);
    });

    it('ranges from 0 to 1', function () {
      expect(Utilities.range(2)).to.eql([0, 1]);
    });

    it('ranges from 1 to 3', function () {
      expect(Utilities.range(3, 1)).to.eql([1, 2, 3]);
    });

    it('ranges from 2 to 4', function () {
      expect(Utilities.range(3, 2)).to.eql([2, 3, 4]);
    });
  });

  describe('shuffle', function () {
    it('permutates the input array', function () {
      const array = Utilities.range(1024);
      const shuffled = Utilities.shuffle(array.slice());
      expect(shuffled).to.not.eql(array);
      expect(shuffled.sort((a, b) => a - b)).to.eql(array);
    });
  });

  describe('binarySearch', function () {
    it('does not find anything in an empty array', function () {
      expect(Utilities.binarySearch([], 42)).to.equal(-1);
    });

    it('does not find an element in an array with one element', function () {
      expect(Utilities.binarySearch([123], 42)).to.equal(-1);
    });

    it('does not find an element in an array with two elements', function () {
      expect(Utilities.binarySearch([12, 34], 42)).to.equal(-1);
    });

    it('does not find an element in an array with three elements', function () {
      expect(Utilities.binarySearch([12, 34, 56], 42)).to.equal(-1);
    });

    it('finds an element in an array with one element', function () {
      expect(Utilities.binarySearch([42], 42)).to.equal(0);
    });

    it('finds the first element in an array with two elements', function () {
      expect(Utilities.binarySearch([12, 34], 12)).to.equal(0);
    });

    it('finds the second element in an array with two elements', function () {
      expect(Utilities.binarySearch([12, 34], 34)).to.equal(1);
    });

    it('finds the first element in an array with three elements', function () {
      expect(Utilities.binarySearch([12, 34, 56], 12)).to.equal(0);
    });

    it('finds the second element in an array with three elements', function () {
      expect(Utilities.binarySearch([12, 34, 56], 34)).to.equal(1);
    });

    it('finds the third element in an array with three elements', function () {
      expect(Utilities.binarySearch([12, 34, 56], 56)).to.equal(2);
    });

    it('finds a random element', function () {
      const array = Utilities.range(1024);
      const value = Math.floor(Math.random() * 1024);
      const index = Utilities.binarySearch(array, value);
      expect(array[index]).to.equal(value);
    });
  });
});
