
#### 1.1.0

- Moved function arguments to for-loop initialisation. This stops developers
from modifying the interpreter's initial values (such as the tape).
- Removed tape index 0 initialisation value.

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
module.exports=(a,u,t=[0],c=1,p=0,s='')=>{
    b=[...a];

    // Notice how we are now initialising `n` in the character iteration
    // for-loop and using it to determine how to modify `i`, rather than
    // specifically waiting until we hit a bracket and explicitly skipping
    // characters using a nested loop.
    for(i=0,n=0;c;i+=n||1){
        c=b[i];
        if(c=='[')n=n?n+1:+!t[p]
        if(c==']')n=n?n+1:-!!t[p]
        if(n)continue;
        
        t[p+=c==">"?1:c=="<"?-1:0]=t[p]||0;
        t[p]+=c=='+'?1:(c=='-'?-1:0);
        if(c=='.')s+=String.fromCharCode(t[p]);
        if(c==',')t[p]=u().charCodeAt(0);
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
