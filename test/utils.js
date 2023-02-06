import { expect } from 'chai';

import * as Utilities from '../dist/utils.js';

describe('Utilities', function () {
  it('sleep', async function () {
    const t0 = Date.now();
    await Utilities.sleep(123);
    const t1 = Date.now();
    expect(t1 - t0).to.be.at.least(123);
  });

  it('next power of two', function () {
    expect(Utilities.npo2(0)).to.equal(0);
    expect(Utilities.npo2(1)).to.equal(1);
    expect(Utilities.npo2(2)).to.equal(2);
    expect(Utilities.npo2(3)).to.equal(4);
    expect(Utilities.npo2(4)).to.equal(4);
    expect(Utilities.npo2(5)).to.equal(8);
    expect(Utilities.npo2(6)).to.equal(8);
    expect(Utilities.npo2(7)).to.equal(8);
    expect(Utilities.npo2(8)).to.equal(8);
    expect(Utilities.npo2(9)).to.equal(16);
    expect(Utilities.npo2(10)).to.equal(16);
    expect(Utilities.npo2(11)).to.equal(16);
    expect(Utilities.npo2(12)).to.equal(16);
    expect(Utilities.npo2(13)).to.equal(16);
    expect(Utilities.npo2(14)).to.equal(16);
    expect(Utilities.npo2(15)).to.equal(16);
    expect(Utilities.npo2(16)).to.equal(16);
    expect(Utilities.npo2(17)).to.equal(32);
    expect(Utilities.npo2(18)).to.equal(32);
    expect(Utilities.npo2(19)).to.equal(32);
    expect(Utilities.npo2(20)).to.equal(32);
  });

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
