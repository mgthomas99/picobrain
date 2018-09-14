
# Changelog

#### 2.0.2

> 250 Bytes.

* Removed optional argument to `String.prototype.charCodeAt()`.
* Removed redundant case from for-loop increment ternary (credit goes to
  [@rdebath](https://github.com/rdebath) for finding that!)

```js
/**
 * @param   {string}            a
 *                              The input brainfuck code.
 * @param   {ArrayLike<number>} t
 *                              The tape. An empty array by default.
 * @param   {() => number}      u
 *                              The user input function.
 * @return  {string}            The printed characters.
 */
module.exports = function*(a, t=[], u) {
    for (i=n=p=0, c=1; c; i+=n>=0?1:-1)
                          // ^^^^^^^^^ Much shorter!
        (
            n += (c = a[i]) == "["
                ? n
                    ? 1
                    : !t[p]
                : c == "]"
                    ? n
                        ? -1
                        : -!!t[p]
                    : 0
        ) || (
            t[p += c == ">" ? 1 : c=="<"?-1:0] =
                (t[p] || 0)
                +
                (c == '+'
                    ? 1
                    : c == '-'
                        ? -1
                        : 0
                ),
            c == '.'
                ? yield String.fromCharCode(t[p])
                : c == ','
                    ? t[p] = u().charCodeAt() // <- `0` is not necessary.
                    : 0
        )
}
```

#### 2.0.1

> 256 Bytes.

* Fixed nested loop issues!

This version just fixes the nested loop bug. It is a major version as I should
have made the previous version a major version. The bug was found by
[@rdebath](https://github.com/rdebath).

```js
/**
 * @param   {string}            a
 *                              The input brainfuck code.
 * @param   {ArrayLike<number>} t
 *                              The tape. An empty array by default.
 * @param   {() => number}      u
 *                              The user input function.
 * @return  {string}            The printed characters.
 */
module.exports = function*(a, t=[], u) {
    for (i=n=p=0, c=1; c; i+=n>0?1:n<0?-1:1)
        (
            n += (c = a[i]) == "["
                ? n
                    ? 1
                    : !t[p]
                : c == "]"
                    ? n
                        ? -1
                        : -!!t[p]
                    : 0
        ) || (
            t[p += c == ">" ? 1 : c=="<"?-1:0] =
                (t[p] || 0)
                +
                (c == '+'
                    ? 1
                    : c == '-'
                        ? -1
                        : 0
                ),
            c == '.'
                ? yield String.fromCharCode(t[p])
                : c == ','
                    ? t[p] = u().charCodeAt(0)
                    : 0
        )
}
```

#### 1.1.0

> 245 Bytes.

* Function is now a generator that yields on every character print (".").
* Initial tape type and contents can be modified by providing it as the second
  argument to the function. By default, the tape is an empty array, which is
  what it was previously.
* Re-structured the for-loop contents into one large expression.
* Updated tests.

```js
/**
 * @param   {string}            a
 *                              The input brainfuck code.
 * @param   {ArrayLike<number>} t
 *                              The tape. An empty array by default.
 * @param   {() => number}      u
 *                              The user input function.
 * @return  {string}            The printed characters.
 */
module.exports = function*(a, t=[], u) {
    for (i=n=p=0, c=1; c; i+=n||1)
        (
            n += (c = a[i]) == "["
                ? n
                    ? 1
                    : !t[p]
                : c == "]"
                    ? n
                        ? 1
                        : -!!t[p]
                    : 0
        ) || (
            t[p += c == ">" ? 1 : c=="<"?-1:0] =
                (t[p] || 0)
                +
                (c == '+'
                    ? 1
                    : c == '-'
                        ? -1
                        : 0
                ),
            c == '.'
                ? yield String.fromCharCode(t[p])
                : c == ','
                    ? t[p] = u().charCodeAt(0)
                    : 0
        )
}
```

#### 1.0.2

> 256 Bytes.

* Moved function arguments to for-loop initialisation. This stops developers
  from modifying the interpreter's initial values (such as the tape).
* Removed tape index 0 initialisation value.
* Transformed bracket for-loops into a series of nested ternary statements.
* Re-structured for-loop variable initialisations.
* Re-structured input and output commands into an inline ternary expression.
* Realised I don't need to split the input code into its individual characters.
  `a[i]` is the same as `[...a][i]`, if `a` is a `string`. 🤦

```js
/**
 * @param   {string}        a
 *                          The input brainfuck code.
 * @param   {() => number}  u
 *                          The user input function.
 * @return  {string}        The printed characters.
 */
// Variable initialisation has been moved from the function arguments to the
// for-loop initialiser.
module.exports = (a, u) => {
    for (t = [i=n=p=0], c = 1, s = ''; c; i += n || 1){
        c = a[i]; // <- No longer expanding `a` every loop!
        // Holy mother of ternary statements...
        if (n += c=="["?n?1:!t[p]:c=="]"?n?1:-!!t[p]:0) continue;
        t[p += c==">"?1:c=="<"?-1:0] = (t[p] || 0) + (c=='+'?1:c=='-'?-1:0);
        c == '.' ? s += String.fromCharCode(t[p]) : c==','?t[p]=u().charCodeAt(0):0
    }return s}
```

#### 1.0.1

> 292 Bytes.

I restructured the for-loop management by integrating each for-loop into the
primary character iteration loop.
Previously, the interpreter would wait until it reached a `[` and then, if
necessary, individually increment `i` to the index of the next un-nested `]`.
However, this required a second loop within the primary character iteration
loop, which uses a lot of characters! Now, the bracket nesting level is always
known, and `i` is incremented by the current "character-skip" direction,
removing the need for two nested loops.

```js
/**
 * @param   {string}        a
 *                          The input brainfuck code.
 * @param   {() => number}  u
 *                          The user input function.
 * @param   {number[]}      t
 *                          The data tape.
 * @param   {string}        c
 *                          The current character.
 * @param   {number}        p
 *                          The pointer index.
 * @param   {string}        s
 *                          The return value.
 * @return  {string}        The printed characters.
 */
module.exports = (a, u, t=[0], c=1, p=0, s='') => {
    b=[...a];

    // Notice how we are now initialising `n` in the character iteration
    // for-loop and using it to determine how to modify `i`, rather than
    // specifically waiting until we hit a bracket and explicitly skipping
    // characters using a nested loop.
    for (i = 0, n = 0; c; i += n || 1){
        c = b[i];
        if (c == '[') n = n ? n + 1 : +!t[p]
        if (c == ']') n = n ? n + 1 : -!!t[p]
        if (n) continue;

        t[p += c==">"?1:c=="<"?-1:0] = t[p] || 0;
        t[p] += c == '+' ? 1 : (c == '-' ? -1 : 0);
        if (c == '.') s += String.fromCharCode(t[p]);
        if (c == ',') t[p] = u().charCodeAt(0);
    }
    return s
}
```

#### 1.0.0

> 329 Bytes.

Initial release.

```js
/**
 * @param   {string}        a
 *                          The input brainfuck code.
 * @param   {() => number}  u
 *                          The user input function.
 * @param   {number[]}      t
 *                          The data tape.
 * @param   {string}        c
 *                          The current character.
 * @param   {number}        p
 *                          The pointer index.
 * @param   {string}        s
 *                          The return value.
 * @return  {string}        The printed characters.
 */
module.exports = (a, u, t=[0], c, p=0, s='') => {
    b = [...a];
    n = 0;
    for (i = 0; i < b.length; i++) {
        c = b[i];
        t[p+=c==">"?1:c=="<"?-1:0]=t[p]||0;
        t[p]+=c=='+'?1:(c=='-'?-1:0);

        if (c == '.') s += String.fromCharCode(t[p]);
        if (c == ',') t[p] = u().charCodeAt(0);
        if (c == '[' && !t[p])
            for (n=1; n > 0; i++)
                n -= b[i] == ']' ? 1 : 0;
        if (c == ']' && t[p])
            for (n = 1; n > 0; i--)
                n -= b[i] == '[' ? 1 : 0;
    }
    return s
}
```
