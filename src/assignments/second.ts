/* 
Counter Function 
    Implement the `counter` function according to requirements: 
        - Function accepts a number as the first argument. This number represents the initial value for the counter. 
        - If no value passed to a function, use `0` as initial value. 
        - Function returns array with two function: 
            - First function allows us to get the current counter value. 
            - Second function increases the internal counter value by one. 
        - Multiple calls of `counter` function create independent instances of counter
*/

export function counter(initialValue = 0) {
  let value = initialValue

  function get() {
    return value
  }

  function increment() {
    value++
  }

  return [get, increment]
}

const [getA, incrementA] = counter(2)
const [getB, incrementB] = counter(0)

console.log('firstCounter: %s', getA())
incrementA()
console.log('firstCounter: %s', getA())

console.log('secondCounter: %s', getB())
incrementB()
console.log('secondCounter: %s', getB())
