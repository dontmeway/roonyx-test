/* 
Passing Data to Parent Component 
    Review following code snippet and answer questions: 
        1) What options do we have to get `open` value in Parent component? 
        2) What benefits and drawbacks of each method?
*/

/* 
Answers: 
    1) 
        -- lifting state up (initializing useReducer in Parent component and passing props)
*/

import { FC, ReactNode, useReducer } from 'react'
export const Parent: FC = () => {
  const [open, toggleOpen] = useReducer((value) => !value, false)
  console.log(open)
  return (
    <div>
      <Child toggleOpen={toggleOpen}>{open && <SomeOtherComponent />}</Child>
    </div>
  )
}
const Child: FC<{ children: ReactNode; toggleOpen: () => void }> = ({
  children,
  toggleOpen,
}) => {
  return (
    <div>
      <button onClick={toggleOpen}>Toggle</button>
      {children}
    </div>
  )
}

const SomeOtherComponent = () => <h1>SomeOtherComponent</h1>
