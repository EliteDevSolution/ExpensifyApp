import _ from 'underscore';
import CONST from '../CONST';

/**
 * Generates a random positive 64 bit numeric string by randomly generating the left, middle, and right parts and concatenating them. Used to generate client-side ids.
 * @returns {String} string representation of a randomly generated 64 bit signed integer
 */
function rand64() {
    // Max 64-bit signed:
    // 9,223,372,036,854,775,807
    // The left part of the max 64-bit number *+1* because we're flooring it.
    const left = Math.floor(Math.random() * (CONST.MAX_64BIT_LEFT_PART + 1));

    let middle;
    let right;

    // If the left is any number but the highest possible, we can actually have any value for the middle part, because even if it's all `9`s, the final value will not overflow the maximum
    // 64-bit number.
    if (left !== CONST.MAX_64BIT_LEFT_PART) {
        middle = Math.floor(Math.random() * CONST.MAX_INT_FOR_RANDOM_7_DIGIT_VALUE);
    } else {
        middle = Math.floor(Math.random() * (CONST.MAX_64BIT_MIDDLE_PART + 1));
    }

    // And unless both the left and middle parts were the maximums, the right part can be any value as well.
    if (left !== CONST.MAX_64BIT_LEFT_PART || middle !== CONST.MAX_64BIT_MIDDLE_PART) {
        right = Math.floor(Math.random() * CONST.MAX_INT_FOR_RANDOM_7_DIGIT_VALUE);
    } else {
        right = Math.floor(Math.random() * (CONST.MAX_64BIT_RIGHT_PART + 1));
    }

    // Pad the middle and right with zeros.
    const middleString = middle.toString().padStart(7, '0');
    const rightString = right.toString().padStart(7, '0');

    return left + middleString + rightString;
}

/**
 * Returns a hexadecimal value of the specified length
 * @param {Number} num
 * @returns {String}
 */
function generateHexadecimalValue(num) {
    return _.times(num, () => Math.floor(Math.random() * 16).toString(16))
        .join('')
        .toUpperCase();
}

/**
 * Generates a random integer between a and b
 * It's and equivalent of _.random(a, b)
 *
 * @param {Number} a
 * @param {Number} b
 * @returns {Number} random integer between a and b
 */
function generateRandomInt(a, b) {
    const lower = Math.ceil(Math.min(a, b));
    const upper = Math.floor(Math.max(a, b));
    return Math.floor(lower + Math.random() * (upper - lower + 1));
}

export {rand64, generateHexadecimalValue, generateRandomInt};
