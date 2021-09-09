import test from './yeetcode.js'

const perfectEven = (n) => {
    if (n <= 0) throw new Error(`cannot take log of ${n}`)
    if (n % 2 !== 0) return false
    if (n / 2 === 1) return true
    return perfectEven(n / 2)
}

const myObj = { key: "value" }
const foo = () => { throw new Error("poop") }

test("These tests work").then(unitTest => {
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
    unitTest.assertKeyValue(myObj, "key", "value")
    unitTest.assertHasKey(myObj, "key")
    unitTest.assertHasValue(myObj, "value")
    unitTest.assertThrows(() => foo(), Error)
    unitTest.assertThrows(() => foo(), Error, { checkMessage: true }, "poop")
})
.then(() => { 
        test("These should fail").then(unitTest => {
            // fail a test
            unitTest.assertEq(55, 5)
            unitTest.assertNotEq(5, 5)
            unitTest.assertTrue(false)
            unitTest.assertFalse(true)
            unitTest.assertEqIgnoreCase("ABC", "abcd")
            unitTest.assertMatch("abc", /abcd/)
            unitTest.assertMatch(/abc/, /abcd/)
            unitTest.assertNotMatch("abc", /abc/)
            unitTest.assertNotMatch(/abc/, /abc/)
            unitTest.assertGreaterThan(6, 5)
            unitTest.assertLessThan(4, 6)
            unitTest.assertGreaterOrEq(4, 3)
            unitTest.assertLessOrEq(4, 6)
            unitTest.assertGreaterOrEq(55, 5)
            unitTest.assertLessOrEq(3, 33)
            unitTest.assertInRange(2, 5, 6)
            unitTest.assertKeyValue(myObj, "k", "v")
            unitTest.assertThrows(() => foo(), Error, { checkMessage: true }, "chips")
        }).then(() => {
            test("0 or Negative Numbers").then(ut => {
                ut.assertThrows(() => perfectEven(0), Error)
                ut.assertThrows(() => perfectEven(-3), Error, { checkMessage: true }, 'cannot take log of -3')
            }).then(() => {
                test("Odd Number").then(ut => {
                    ut.assertFalse(perfectEven(3))
                })
            }).then(() => {
                test("Even Number w/ odd factors").then(ut => {
                    ut.assertFalse(perfectEven(24))
                })
            }).then(() => {
                test("Perfect Even Numbers").then(ut => {
                    ut.assertTrue(perfectEven(64))
                }).catch(err => console.log(err))
            }).then(() => {
                test("Test assert in range").then(ut => {
                    ut.assertInRange(10, 1, 10, { start: true, end: true })
                })
            }).then(() => {
                test("Fail assert in range").then(ut => {
                    ut.assertInRange(10, 1, 10, { start: true, end: false })
                })
            }).then(() => {
                test("Poop").then(ut => {
                    ut.assertInRange(1, 1, 10, { start: false, end: false })
                })
            }).then(() => {
                test("I won").then(ut => {
                    ut.assertInRange(1, 1, 10, { start: false, end: false })
                })
            })
        })
})


