import {deepStrictEqual, notDeepStrictEqual, AssertionError } from 'assert'
const RED = "\x1b[31m"
const YELLOW = "\x1b[33m"
const GREEN = "\x1b[32m"
const WHITE = "\x1b[37m"

const EQ_MESSAGE = (expected, actual) => `${RED}Expected ${expected}, got ${actual}`
const NE_MESSAGE = (expected, actual) => `${RED}Expected value other than ${expected}, got ${actual}`
const BOOLEAN_MESSAGE = (bool) =>`${RED}Statement should be ${bool}`
const COMPARE_MESSAGE = (expected, actual, operator) => `${RED}${actual} is not ${operator} than ${expected}`
const RANGE_MESSAGE = (actual, start, end, incStart, incEnd) => `${RED}${actual} is not in range of ${incStart}${start}, ${end}${incEnd}`
const OBJ_MESSAGE = (key, value) => `${RED}Key: ${key} does not map to Value: ${value}`
const KEY_MESSAGE = (key) => `${RED}${key} is not present in the object's keys`
const VAL_MESSAGE = (value) => `${RED}${value} is not present in the object's values`
const THROW_MESSAGE = (error) =>`${RED}${error} was not thrown`
const ERR_MESSAGE = (expected, expectedMessage, actual) =>`${RED}Wrong Error thrown and/or wrong message\n`+
`Excpected Error: ${expected.name}, Message: ${expectedMessage}\n`+
`Actual Error Thrown: ${actual.name}, Message: ${actual.message}`

 
let pass = (n) => `${GREEN}🧪 Test Case ${n} passed ✔️${WHITE}`
let fail = (n) => `${RED}🔥 TEST CASE ${n} FAILED ❌ ${WHITE}`

class Tester 
{
    // private variables
    #testNo

    constructor(description="") 
    {
        this.#testNo = 0
        console.log("========================================================================")
        console.log(`Description: ${description}`)
        console.log("========================================================================")
    }

    // values
    /**
     * 
     * @param {any} expected 
     * @param {any} actual
     * @param {string} message 
     */
    assertEq = (expected, actual, message = EQ_MESSAGE(expected, actual)) => 
    {
        try
        {
            deepStrictEqual(actual, expected, `${fail(this.#testNo)}: ${message}`)
            console.log(pass(this.#testNo))       
        }
        catch(err)
        {
            console.log(err.message+WHITE)   
        }
        finally
        {
            this.#testNo++;
        }

    }

    /**
     * 
     * @param {any} expected 
     * @param {any} actual 
     * @param {string} message 
     */
    assertNotEq = (expected, actual, message = NE_MESSAGE(expected, actual)) => 
    {
        try
        {
            notDeepStrictEqual(actual, expected, `${fail(this.#testNo)}: ${message}`)
            console.log(pass(this.#testNo))
        }
        catch(err)
        {
            console.log(err.message+WHITE)  
        }
        finally
        {
            this.#testNo++;
        }
    }

    //boolean
    /**
     * statement is true
     * @param {boolean} statement
     * @param {string} message 
     */
    assertTrue = (statement, message = BOOLEAN_MESSAGE(true)) => this.assertEq(statement, true, message)

    /**
     * statement is false
     * @param {boolean} statement
     * @param {string} message 
     */
    assertFalse = (statement, message = BOOLEAN_MESSAGE(false)) => this.assertEq(statement, false, message)

    //string
    /**
     * strings are equal regardless of case-sensitivity
     * @param {string} expected 
     * @param {string} actual 
     */
    assertEqIgnoreCase = (expected, actual) => this.assertEq(expected.toLowerCase(), actual.toLowerCase())

    /**
     * matches regexp
     * @param {RegExp | String} actual 
     * @param {RegExp} pattern 
     */
    assertMatch = (actual, pattern) => this.assertTrue(pattern.test(actual))

    /**
     * does not match regexp
     * @param {RegExp | String} actual 
     * @param {RegExp} pattern 
     */
    assertNotMatch = (actual, pattern) => this.assertFalse(pattern.test(actual));

    //numbers 
    /**
     * greater than
     * @param {number} expected 
     * @param {number} actual 
     */
    assertGreaterThan = (expected, actual) => this.assertTrue(actual > expected, COMPARE_MESSAGE(expected, actual, '>'))

    /**
     * less than
     * @param {number} expected 
     * @param {number} actual 
     */
    assertLessThan = (expected, actual) => this.assertTrue(actual < expected, COMPARE_MESSAGE(expected, actual, '<'))

    /**
     * greater than or equal to
     * @param {number} expected 
     * @param {number} actual 
     */
    assertGreaterOrEq = (expected, actual) => this.assertTrue(actual >= expected, COMPARE_MESSAGE(expected, actual, '>='))

    /**
     * less than or equal to 
     * @param {number} expected 
     * @param {number} actual 
     */
    assertLessOrEq = (expected, actual) => this.assertTrue(actual <= expected, COMPARE_MESSAGE(expected, actual, '<='))

    /**
     * inside range inclusive unless specified otherwise
     * @usage assertInRange(actual, start, end)
     * @usage assertInRange(actual, start, end, {start: boolean, end: boolean})
     * @param {number} actual 
     * @param {number} start 
     * @param {number} end 
     * @param {Object} include {start: boolean, end: boolean}
     */
    assertInRange = (actual, start, end, include = { start: true, end: true }) => {
        if (!start || !end)
            console.warn(`${YELLOW} Usage:⚠️
        assertInRange(actual, start, end)
        assertInRange(actual, start, end, {start: boolean, end: boolean})
        ${WHITE}`)

        else if (include.start && include.end)
            this.assertTrue(actual >= start && actual <= end, RANGE_MESSAGE(actual, start, end, '[', ']'))

        else if (!include.start && !include.end)
            this.assertTrue(actual > start && actual < end, RANGE_MESSAGE(actual, start, end, '(', ')'))

        else if (include.start && !include.end)
            this.assertTrue(actual >= start && actual < end, RANGE_MESSAGE(actual, start, end, '[', ')'))

        else if (!include.start && include.end)
            this.assertTrue(actual > start && actual <= end, RANGE_MESSAGE(actual, start, end, '(', ']'))

        else console.error(`${RED}something went wrong!❌`)
    }

    //objects
    /**
     * an object at 'key' equals 'value'
     * @param {Object} actual 
     * @param {string} key 
     * @param {any} value 
     */
    assertKeyValue = (actual, key, value) => this.assertEq(actual[key], value, OBJ_MESSAGE(key, value))

    /**
     * object contains key
     * @param {Object} actual 
     * @param {string} key 
     */
    assertHasKey = (actual, key) => this.assertTrue(Object.keys(actual).some(k => k === key), KEY_MESSAGE(key))

    /**
     * object contains value
     * @param {Object} actual 
     * @param {any} value 
     */
    assertHasValue = (actual, value) => this.assertTrue(Object.values(actual).some(v => v === value), VAL_MESSAGE(value))

    //errors
    /**
     * function throws an error
     * @usage assertThrows(func, expecterError)
     * @usage assertThrows(func, expecterError, {checkMessage: true}, errorMessage)
     * @param {Function} func function that throws error, call this way: () => func()
     * @param {Error} expectedError expected error type
     * @param {Object} options {checkMessage: boolean} 
     * @param {string} errorMessage expected error message
     */
    assertThrows = (func, expectedError, options ={checkMessage: false}, errorMessage= "") =>
    {
        let flag = false
        try
        {
            func()
        }
        catch(actualError)
        {
            flag = true
            if (!options.checkMessage)
                this.assertEq(actualError.name, expectedError.name)
            else
                this.assertTrue(
                    actualError.name===expectedError.name && 
                    actualError.message === errorMessage,
                    ERR_MESSAGE(expectedError, errorMessage, actualError)
                )
        }
        if (!flag) 
            throw new AssertionError(
            {
                message: `${fail(this.#testNo)}: ${THROW_MESSAGE(expectedError.name)}`,
                expected: expectedError.name,
                actual: func
            })
    }
}

const test = async(description="") => 
{
    console.log()
    const t = new Tester(description)
    return t;
}

export default test