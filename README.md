# YeetCode

## Promise Based Unit Testing

### Git repo
https://github.com/alanngo/yeetcode.git

### NPM package
https://www.npmjs.com/package/yeetcode

### Install

```bash
$ npm install yeetcode
```

### Create a simple test case

```js
import test from 'yeetcode'

const foo = (a,b) => a + b
test("TestDescription").then(ut =>
{
    ut.assertEq(5, foo(3, 2))
})
```

### Run multiple tests
```js
import test from 'yeetcode'


test("Test Suite 0").then(ut =>
{
    // test cases here
    ...
}).then(() =>
{
    test("Test Suite 1").then(ut =>
    {
        // more test cases
        ...
    })
}).then(() =>
{
    test("Test Suite 2").then(ut =>
    {
        // more test cases
        ...
    })
})
...
```

## Options

### Default configuration
```js
{
    haltOnFailure: true, // stop or continue tests after failure
    writeToFile: false // output test results to 'results.log'
}
```

### Creating Test w/ Options
```js
const options = {haltOnFailure: false} // all tests will run regardless of failure
import test from 'yeetcode'

const foo = (a,b) => a + b
test("TestDescription", options).then(ut =>
{
    ut.assertEq(5, foo(3 + 2))
})
```



### All assert functions
```ts
// any value type
assertEq(expected: any, actual: any)
assertEq(expected: any, actual: any, message: String)
assertNotEq(expected: any, actual: any)
assertNotEq(expected: any, actual: any, message: String)

//boolean
assertTrue(statement: boolean)
assertTrue(statement: boolean, message: String)
assertFalse(statement: boolean)
assertFalse(statement: boolean, message: String)

//String
assertEqIgnoreCase(expected: String, actual: String)
assertMatch(expected: String | RegExp, actual: RegExp)
assertNotMatch(expected: String | RegExp, actual: RegExp)

//Number
assertGreaterThan(expected: Number, actual: Number)
assertLessThan(expected: Number, actual: Number)
assertGreaterOrEq(expected: Number, actual: Number)
assertLessOrEq(expected: Number, actual: Number)
assertInRange(actual: Number, start: Number, end: Number)
assertInRange(actual: Number, start: Number, end: Number, include: {start: boolean, end: boolean})

//objects
assertKeyValue(actual: Object, key: String, value: any)
assertHasKey(actual: Object, key: String)
assertHasValue(actual: Object, value: any)

//error
assertThrows(func: Function, expectedError: Error)
assertThrows(func: Function, expectedError: Error, options: {checkMessage: boolean}, errorMessage: String)
```
