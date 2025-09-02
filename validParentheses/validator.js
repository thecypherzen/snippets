// Parentheses Validator

/**
 * A Stack data structure
 * @class Stack
 */
class Stack {
  #repr = [];

  /**
   * Removes an character from the stack
   * @method pop
   * @returns {string} The character on stack's top
   */
  pop() {
    return this.#repr.pop();
  }

  /**
   * Adds an character to top of stack
   * @method push
   * @param {string} char The character to add to stack
   * @return {boolean} true on success, false on error
   */
  push(elem) {
    try {
      this.#repr.push(elem);
      return true;
    } catch (_) {
      return false;
    }
  }

  /**
   * Prints out the stack
   * @method print
   * @returns {void} Doesn't return a value
   */
  print() {
    console.log("stack:", this.#repr);
  }
  /**
   * Returns the number of characters in stack
   * @returns {number} The length of the stack
   */
  get len() {
    return this.#repr.length;
  }
  /**
   * Retrieves the character on stack's top
   * @returns {string} The character
   */
  get peek() {
    return this.#repr[this.#repr.length - 1];
  }
  /**
   * Retrieves the characters in stack in an Array
   * @returns {Array} The array of stack characters
   */
  get values() {
    return [...this.#repr];
  }
}

/**
 * Parentheses Match Definitions
 * @const {object} pairings
 */
const pairings = {
  "{": "}",
  "[": "]",
  "(": ")",
};

/**
 * Validates a string of Parentheses
 * @param {string} str The string to validate
 * @returns {boolean} true if valid, false otherwise
 * @throws {Error} If arg is not a string
 */
export function validateParentheses(str) {
  const t = typeof str;
  if (t !== "string") {
    throw new Error(`Expected <string>, but got <${t}>`);
  }
  const stack = new Stack();
  for (let i = 0; i < str.length; i++) {
    if (!isAlpha(str[i])) {
      if (!stack.len) {
        // empty stack
        stack.push(str[i]);
      } else {
        // current char is an opening bracket
        if (
          str[i] == "{" ||
          str[i] == "[" ||
          str[i] === "(" ||
          isAlpha(str[i])
        ) {
          stack.push(str[i]);
        } else {
          const v = stack.peek;
          // char matches expected closing bracket
          if (str[i] === pairings[v] || isAlpha(v)) {
            stack.pop();
          } else {
            // char not expected closing bracket
            stack.push(str[i]);
          }
        }
      }
    }
  }
  return !stack.len;
}

/**
 * Verifies if a character is an alphabet
 * @function isAlpha
 * @param {any} char the character to validate
 * @returns {boolean} true if char is an alpha. false otherwise
 */
export function isAlpha(char) {
  const code = char.charCodeAt(0);
  return (code > 64 && code < 91) || (code > 96 && code < 123);
}

/**
 * Implements a simple suite of Tests
 * @class Tests
 */
export class TestSuite {
  /**
   * Executes a collection of tests
   * Prints Result for each test as well as a summary
   * at the end
   * @method run
   * @param {Array} values The collection of tests
   * @returns {boolean} true if all tests passed false otherwise
   * @static
   */
  static run(values) {
    if (!Array.isArray(values)) {
      throw new Error(`Expects Array but got ${typeof values}`);
    }
    const total = values.length;
    const totalDigits = getDigits(total);
    let passCount = 0;
    values.forEach((value, index) => {
      const res = validateParentheses(value[0]);
      const testNo = index + 1;
      let status;
      if (value[1] === res) {
        status = "Passed";
        passCount += 1;
      } else {
        status = "Failed";
      }
      console.log(
        `Test ${String(testNo).padStart(totalDigits, " ")}: ${status}${
          status === "Failed" ? ` Expected [${value[1]}], Got [${res}]` : ""
        }`
      );
    });
    console.log("------------------------");
    console.log(`${passCount} of ${total} tests passed)`);
    return passCount === total;
  }
}

/**
 * returns the digits in a number
 * @function getDigits
 * @param {number} num - The number to inspect
 * @returns {number}  Digits in number
 * @throws {Error} If num is not a <number>
 */
export function getDigits(num) {
  const t = typeof num;
  if (t !== "number") {
    throw new Error(`Expects <number> but got ${t}`);
  }
  let l = 0;
  while (num) {
    num = Math.floor(num / 10);
    l += 1;
  }
  return l;
}

/**
 * Defines some tests for function
 * Feel free to extend the test suite
 * @const testSuite
 */
const tests = [
  // Valid strings
  ["()", true],
  ["()[]{}", true],
  ["{[()]}", true],
  ["({[]})", true],
  ["", true], // Empty string is valid
  ["abc", true], // String with no brackets is valid
  ["((()))", true],
  ["([])", true],
  ["{([{([])}])}", true],

  // Invalid strings
  ["(]", false], // Mismatched bracket type
  ["([)]", false], // Incorrect nesting order
  ["{[}", false], // Incorrect nesting order
  ["((()", false], // Unmatched opening bracket
  ["())", false], // Unmatched closing bracket
  ["}{", false], // Closing bracket before opening
  ["]", false], // Unmatched closing bracket
  ["[", false], // Unmatched opening bracket
  ["abc)", false], // Extra closing bracket
  ["({[})", false], // Incorrect nesting order
];

/****************/
/* Entry point  */
/****************/
TestSuite.run(tests);
