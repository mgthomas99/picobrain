var test = require("tape");
var bf = require("../");

function iteratorToString(iter) {
  return Array.from(iter).join("");
}

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
    var r = bf("+++++++++++++++++++++++++++++++++.");
    t.assert(iteratorToString(r) === "!");
    t.pass();
  } catch (ex) {
    t.fail();
  }
  t.end();
});

test("Simple Loop", function (t) {
  try {
    var r = bf("+++[>++++++++++<-]>+++.");
    t.assert(iteratorToString(r) === "!");
    t.pass();
  } catch (ex) {
    t.fail();
  }
  t.end();
});

test("Nested loop", function (t) {
  try {
    var r = bf("+++[>+++++[>++<-]<-]>>+++.");
    t.assert(iteratorToString(r) === "!");
    t.pass();
  } catch (ex) {
    t.fail();
  }
  t.end();
});
