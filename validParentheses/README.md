# Introduction

_validator_ module basically implements a parenthesis validation function and exposes
it as well as a few other utilities that could be used outside of the modlue.

<hr />

## The Problem

The _Valid Parentheses_ problem is a classic algorithm challenge used to test understanding of data structures, particularly stacks. The task is to determine if a string containing only `parentheses ()`, `curly braces {}` and `square brackets []` is valid.

### What Makes a String Valid?

For a string containing parentheses (), curly braces {}, and square brackets [], it is valid if it meets the following criteria:

- Every opening bracket has a matching closing bracket of the same type.
- The brackets close in the correct order _(e.g., ([{}]) is valid, but ([)] is not)_.
- An empty string is always considered valid.
- Some versions of this problem may include other characters, such as letters or numbers.
  - In these cases, the standard approach is to ignore any characters that are not brackets.
  - A string consisting of only alphabets, or a combination of alphabets and valid brackets, would still be considered valid as long as the brackets themselves are valid (e.g., abc{def[ghi]jkl} is valid, and abc alone is also valid).

## The Solution

- My solution considers Alphabets, parentheses and empty strings to be valid and implements:
  - `The Stack (public)` - It's a class that has uses a private Array to implement the stack. The choice of privacy is to prevent external modification of the stack.
    - It implements public stack methods: `pop`, `print` and `push` as well as getter attributes: `peek`, `len`, and `values`.
    - Each attribute is well documented so you can read the class for details of each attribute.
  - `The Function (public)` - The `validateParentheses` function is the one who uses the stack to validate the string.
    - It expects an argument of type `string` and throws an error if another data type is passed to it.
    - Returns `true` or `false` as per validity of arg passed.
  - `The TestSuite (public)` - This is a _class_ that handles testing. It implements only one method `run` that takes a suite of testacases and executes them, printing results to the console, and returns `true` _iff_ all tests pass.
    - It's just a simple solution for this problem only. More extensive tests can be done with standard testing libraries like `Mocha` or `Jest`.
  - `isAlpha (public)` - A function that takes a string and validates if the first character is an alphabet. It expects a single character and so it uses only the first char.
  - `getDidits`: - A function that tells the number of digits in the number passed as an argument. It expects a number and throws an error if another type is passed.
- A suite of tests are defined but not exposed. On entry, they are executed and results printed. The tests are private and hence, are not accessible outside the module.
- The `stack`, `validator function` and `test suite` are public should anyone want to re-use or test them as they like.

## Technologies

Written in vanilla Javascript

## Finally

Any comments? Send me a message on [X](https://x.com/williamInyam) or [email](mailto:sw.inyam@outlook.com)
