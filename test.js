import Tester from './yeetcode.js'

const unitTest = new Tester()

unitTest.assertEq(5, 5)
unitTest.assertNotEq(5, 4)
unitTest.assertTrue(true)
unitTest.assertFalse(false)
unitTest.assertEqIgnoreCase("ABC", "abc")
unitTest.assertMatch("abc", /abc/)
unitTest.assertMatch(/abc/, /abc/)
unitTest.assertNotMatch("abc", /def/)
unitTest.assertNotMatch(/abc/, /def/)
unitTest.assertGreaterThan(4, 5)
unitTest.assertLessThan(4, 3)
unitTest.assertGreaterOrEq(4, 5)
unitTest.assertLessOrEq(4, 3)
unitTest.assertGreaterOrEq(5, 5)
unitTest.assertLessOrEq(3, 3)
unitTest.assertInRange(6, 5, 6)

let myObj = {key: "value"}
unitTest.assertKeyValue(myObj, "key", "value")
unitTest.assertHasKey(myObj, "key")
unitTest.assertHasValue(myObj, "value")

const foo = () => {throw new Error("poop")}
unitTest.assertThrows(() => foo(), Error)
unitTest.assertThrows(() => foo(), Error, {checkMessage: true}, "poop")

// fail a test
// unitTest.assertFalse(true)
// unitTest.assertKeyValue(myObj, "k", "v")
// unitTest.assertThrowsMessage(()=> foo(), Error, "chips")



