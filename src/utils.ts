/**
 * Compares two numbers with a tolerance.
 *
 * @param a  The first number.
 * @param b  The second number.
 * @param e  The tolerance.
 * @returns `true` iff `b` is in the closed range `[a-e, a+e]`.
 */
export function almostEquals(a: number, b: number, e: number): boolean {
  return b >= a - e && b <= a + e;
}

/**
 * Calculates a "wrap around" version of the modulus.
 *
 * The formula is:
 *
 * ```js
 * ((a % b) + b) % b
 * ```
 *
 * The result is always in the range `[0, b)` and never negative, even if `a` is
 * negative. This is useful when looking up arrays.
 */
export function mod(a: number, b: number): number {
  return ((a % b) + b) % b;
}

/**
 * Rounds x to the next power of 2.
 *
 * It is assumed that x is a positive integer.
 */
export function npo2(x: number): number {
  if (x <= 0) {
    return 1;
  }
  let y = 1;
  while (x) {
    x >>>= 1;
    y <<= 1;
  }
  return y;
}

/**
 * Generates an array of `length` consecutive integers.
 *
 * The returned integers may optionally start from an `offset`, which defaults
 * to 0.
 *
 * For example, `range(6, 4)` will return `[4, 5, 6, 7, 8, 9]`.
 *
 * @param length  the number of integers to generate.
 * @param offset  the offset of the generated values (the values range from
 *                `offset` to `length - offset`, inclusive).
 *
 * @returns the generated array.
 */
export function range(length: number, offset = 0): number[] {
  return Array.from({ length }, (_, i) => offset + i);
}

/**
 * Shuffles an array in place.
 *
 * This function produces a uniformly distributed pseudo-random permutation. It
 * uses the [Knuth / Fisher-Yates shuffle
 * algorithm](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle).
 *
 * It is not safe for cryptographic purposes because it uses `Math.random` for
 * randomization, which is in turn not cryptographically safe.
 *
 * @returns the input array.
 */
export function shuffle<Element>(array: Element[]): Element[] {
  for (let i = 0; i < array.length; i++) {
    const j = i + Math.floor(Math.random() * (array.length - i));
    const t = array[i];
    array[i] = array[j];
    array[j] = t;
  }
  return array;
}

/**
 * Generates a random integer between `min` and `max` inclusive.
 *
 * For example, this generates a random integer from 0 to 99 inclusive:
 *
 * ```js
 * Utilities.randomInt(1, 100);
 * ```
 *
 * This function is NOT cryptographically secure.
 *
 * @returns an integer number in the range [min, max].
 */
export function randomInt(min: number, max: number): number {
  return min + Math.floor(Math.random() * (max + 1 - min));
}

/**
 * Generates `count` random numbers in the range `[min, max)` without repetitions.
 *
 * For example, to generate 6 numbers between 1 and 90 inclusive without repetitions, you can run:
 *
 * ```js
 * const numbers = Utilities.randomIntsNoReps(6, 1, 91);
 * console.log(numbers);  // Possible output: [ 66, 7, 80, 75, 29, 3 ]
 * ```
 *
 * This is not the same as calling `Utilities.randomInts(1, 91)` six times because that wouldn't
 * guarantee uniqueness ([randomInt](#randomInt) may generate the same number more than once).
 *
 * This function uses the [Knuth / Fisher-Yates shuffle
 * algorithm](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle) and has a complexity of
 * `O(N)` with `N = max - min`.
 *
 * This function is NOT cryptographically secure.
 *
 * @return an array of length `count` containing the generated numbers.
 */
export function randomIntsNoReps(count: number, min: number, max: number): number[] {
  const numbers = range(max - min, min);
  for (let i = 0; i < count; i++) {
    const j = randomInt(i, numbers.length);
    if (j !== i) {
      const t = numbers[i];
      numbers[i] = numbers[j];
      numbers[j] = t;
    }
  }
  numbers.length = count;
  return numbers;
}

/**
 * Flattens an array of arrays.
 *
 * The argument is a mixed array containing raw elements and/or sub-arrays of
 * raw elements. `flatten` returns a new flat array of raw elements. The input
 * array is not modified.
 *
 * Note that this function can be used to flatten two-dimensional arrays but not
 * three or higher dimensional arrays.
 *
 * @returns the flattened array.
 */
export function flatten<Element>(array: (Element | Element[])[]): Element[] {
  return Array.prototype.concat.apply([], array);
}

/**
 * Performs a binary search over an ordered array.
 *
 * Complexity: O(log(N)).
 *
 * @returns the index of the searched element, or -1 if the element is not
 *          found.
 */
export function binarySearch<Element>(array: Element[], element: Element): number {
  let i = 0,
    j = array.length;
  while (j > i) {
    const k = i + ((j - i) >>> 1);
    if (array[k] < element) {
      i = k + 1;
    } else if (array[k] > element) {
      j = k;
    } else {
      return k;
    }
  }
  return -1;
}

/**
 * Finds the first element that is greater than or equal to the provided
 * `value`.
 *
 * If `value` is strictly greater than all the elements in the array this
 * function returns `array.length`, while if it's strictly smaller or the array
 * is empty 0 is returned.
 *
 * Complexity: O(log(N)).
 *
 * @returns the index of the lower bound element.
 */
export function lowerBound<Element>(array: Element[], value: Element): number {
  let i = 0,
    j = array.length;
  while (j > i) {
    const k = i + ((j - i) >>> 1);
    if (array[k] < value) {
      i = k + 1;
    } else {
      j = k;
    }
  }
  return i;
}
