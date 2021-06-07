import assert from 'assert'
const RED = "\x1b[31m"
const YELLOW ="\x1b[33m"
const GREEN = "\x1b[32m"
const WHITE = "\x1b[37m"

const EQ_MESSAGE= (expected, actual) => `${RED}expected ${expected}, got ${actual}`
const NE_MESSAGE = (expected, actual) => `${RED}expected value other than ${expected}, got ${actual}`
const COMPARE_MESSATE = (expected, actual, operator) => `${RED}${actual} is not ${operator} than ${expected}`
const RANGE_MESSAGE = (actual, start, end, incStart, incEnd) => `${RED}${actual} is not in range of ${incStart}${start}, ${end}${incEnd}` 
const OBJ_MESSAGE = (key, value) =>`${RED}${key} does not map to ${value}`
const KEY_MESSAGE = (key) =>`${RED}${key} is not present in the object's keys`
const VAL_MESSAGE = (value) =>`${RED}${value} is not present in the object's values`


let testNo = 0
let pass = (n) =>`${GREEN}Test ${n} passed ✔️${WHITE}`
let fail = (n) =>`${RED}TEST ${n} FAILED ❌ ${WHITE}`
class Tester
{
    constructor()
    {
        console.log("YeetCode Unit Tester🧪")
        console.log("====================")
    }

    // values
    /**
     * 
     * @param {any} expected 
     * @param {any} actual
     * @param {string} message 
     */
    assertEq(expected, actual, message=EQ_MESSAGE(expected, actual)) 
    {
        assert.deepStrictEqual(actual, expected, `${fail(testNo)}: ${message}`)
        console.log(pass(testNo))
        testNo++;
    }

    /**
     * 
     * @param {any} expected 
     * @param {any} actual 
     * @param {string} message 
     */
    assertNotEq(expected, actual, message=NE_MESSAGE(expected, actual)) 
    {
        assert.notDeepStrictEqual(actual, expected, `${fail(testNo)}: ${message}`)
        console.log(pass(testNo))
        testNo++;
    }

    //boolean
    /**
     * statement is true
     * @param {boolean} statement
     * @param {string} message 
     */
    assertTrue(statement, message =""){this.assertEq(statement, true, message)}

    /**
     * statement is false
     * @param {boolean} statement
     * @param {string} message 
     */
    assertFalse(statement, message ="") {this.assertEq(statement, false, message)}

    //string
    /**
     * strings are equal regardless of case-sensitivity
     * @param {string} expected 
     * @param {string} actual 
     */
    assertEqIgnoreCase(expected, actual){this.assertEq(expected.toLowerCase(), actual.toLowerCase())}

    /**
     * matches regexp
     * @param {RegExp | String} actual 
     * @param {RegExp} pattern 
     */
    assertMatch(actual, pattern){this.assertTrue(pattern.test(actual))}

    /**
     * does not match regexp
     * @param {RegExp | String} actual 
     * @param {RegExp} pattern 
     */
    assertNotMatch(actual, pattern){this.assertFalse(pattern.test(actual));}

    //numbers 
    /**
     * greater than
     * @param {number} expected 
     * @param {number} actual 
     */
    assertGreaterThan(expected, actual)
    {this.assertTrue(actual > expected, COMPARE_MESSATE(expected, actual, '>'))}

    /**
     * less than
     * @param {number} expected 
     * @param {number} actual 
     */
    assertLessThan(expected, actual)
    {this.assertTrue(actual < expected, COMPARE_MESSATE(expected, actual, '<'))}

    /**
     * greater than or equal to
     * @param {number} expected 
     * @param {number} actual 
     */
    assertGreaterOrEq(expected, actual)
    {this.assertTrue(actual >= expected, COMPARE_MESSATE(expected, actual, '>='))}

    /**
     * less than or equal to 
     * @param {number} expected 
     * @param {number} actual 
     */
    assertLessOrEq(expected, actual)
    {this.assertTrue(actual <= expected, COMPARE_MESSATE(expected, actual, '<='))}

    /**
     * inside range inclusive unless specified otherwise
     * @usage assertInRange(actual, start, end)
     * @usage assertInRange(actual, start, end, {start: boolean, end: boolean})
     * @param {number} actual 
     * @param {number} start 
     * @param {number} end 
     * @param {Object} include 
     */
    assertInRange(actual, start, end, include={start: true, end: true})
    {
        if (!start || !end) 
        console.warn(`${YELLOW} Usage:⚠️
        assertInRange(actual, start, end)
        assertInRange(actual, start, end, {start: boolean, end: boolean})
        ${WHITE}`)
        
        else if (include.start && include.end) 
            this.assertTrue(actual >=start && actual <=end, RANGE_MESSAGE(actual, start, end, '[', ']'))
        
        else if (!include.start && !include.end) 
            this.assertTrue(actual > start && actual<end, RANGE_MESSAGE(actual, start, end, '(', ')'))
        
        else if (include.start && !include.end)
            this.assertTrue(actual >=start && actual <end, RANGE_MESSAGE(actual, start, end, '[', ')'))
        
        else if (!include.start && include.end) 
            this.assertTrue(actual >start && actual<=end, RANGE_MESSAGE(actual, start, end, '(', ']'))
        
        else console.error(`${RED}something went wrong!❌`)
    }

    //objects
    /**
     * an object at 'key' equals 'value'
     * @param {Object} actual 
     * @param {string} key 
     * @param {any} value 
     */
    assertKeyValue(actual, key, value){this.assertEq(actual[key], value, OBJ_MESSAGE(key, value))}

    /**
     * object contains key
     * @param {Object} actual 
     * @param {string} key 
     */
    assertHasKey(actual, key){this.assertTrue(Object.keys(actual).some(k => k===key),KEY_MESSAGE(key))}

    /**
     * object contains value
     * @param {Object} actual 
     * @param {any} value 
     */
    assertHasValue(actual, value){this.assertTrue(Object.values(actual).some(v => v===value),VAL_MESSAGE(value))}
}

export default Tester