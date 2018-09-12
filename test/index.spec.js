var test = require("tape");
var bf = require("../");

test("bf()", function (t) {
  try {
    t.assert(typeof bf === "function");
    t.pass();
  } catch (ex) {
    t.fail();
  }
  t.end();
});

test("Cell increment", function (t) {
  try {
    t.assert(bf("+++++++++++++++++++++++++++++++++.") === "!");
    t.pass();
  } catch (ex) {
    t.fail();
  }
  t.end();
});
