# YeetCode

## Simple unit test class


### Install

```bash
$ npm install yeetcode
```

### Sample usage

```js
import Tester from 'yeetcode'

const unitTest = new Tester()
const foo = (a, b) => a + b

// equality test
unitTest.assertEq(5, foo(3, 2)) // test should pass

// boolean test
unitTest.assertTrue(foo(3, 2)===5)// test should pass

```


### All assert functions
```ts
// any value type
assertEq(expected: any, actual: any)
assertEq(expected: any, actual: any, message: string)
assertNotEq(expected: any, actual: any)
assertNotEq(expected: any, actual: any, message: string)

//boolean
assertTrue(statement: boolean)
assertTrue(statement: boolean, message: string)
assertFalse(statement: boolean)
assertFalse(statement: boolean, message: string)

//string
assertEqIgnoreCase(expected: string, actual: string)
assertMatch(expected: string | RegExp, actual: RegExp)
assertNotMatch(expected: string | RegExp, actual: RegExp)

//number
assertGreaterThan(expected: number, actual: number)
assertLessThan(expected: number, actual: number)
assertGreaterOrEq(expected: number, actual: number)
assertLessOrEq(expected: number, actual: number)
assertInRange(actual: number, start: number, end: number)
assertInRange(actual: number, start: number, end: number, include: Object)

//objects
assertKeyValue(actual: Object, key: string, value: any)
assertHasKey(actual: Object, key: string)
assertHasValue(actual: Object, value: any)

//error
assertThrows(func: Function, expectedError: Error)
assertThrows(func: Function, expectedError: Error, options: Object, errorMessage: string)
```
