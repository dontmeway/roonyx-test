/* 
Props Drilling 
    Review following code snippet and answer questions: 
        1) What’s wrong with this code snippet? 
        2) How can we improve it? 
        3) What benefits and drawbacks of each method? 
*/

/* 
Answers:
    1) Props drilling and if we should only read value during re-renders instead of 'useState' we can use 'useRef' hook
    2) 
        -- We can use Context API to prevent props drilling
        -- Move state deeper if parent does not need access to state
        -- Use children prop and wrap memo proper components
    3) 
        -- Context API in this case I think most correct way to prevent props drilling
        -- Parent component losts access to state
        -- unnecessary re-renders, when count changes both layerA and layerB will be re-rendered
*/

import { createContext, FC, memo, useContext, useState } from 'react'

type CounterContextValue = {
  count: number
  setCount: (value: number) => void
}

const CounterContext = createContext<CounterContextValue | null>(null)
const LayerAContext = createContext(1)
const LayerBContext = createContext(2)

export const Parent: React.FC = () => {
  const [count, setCount] = useState(0)
  const [extraA, setExtraA] = useState(1)
  const [extraB, setExtraB] = useState(2)
  renderLog('Parent')

  return (
    <CounterContext.Provider value={{ count, setCount }}>
      <LayerAContext.Provider value={extraA}>
        <LayerBContext.Provider value={extraB}>
          <LayerA />
        </LayerBContext.Provider>
      </LayerAContext.Provider>
    </CounterContext.Provider>
  )
}

/**
 * LAYER A ------------------------------------------------- */

const LayerA: FC = memo(() => {
  const extraA = useContext(LayerAContext)
  renderLog('LayerA')

  return (
    <div>
      <LayerB /> <div>{extraA}</div>
    </div>
  )
})
/**
 * LAYER B ------------------------------------------------- */

const LayerB: FC = memo(() => {
  const extraB = useContext(LayerBContext)
  renderLog('LayerB')

  return (
    <div>
      <Child />
      <div>{extraB}</div>
    </div>
  )
})

//LAST CHILD ----------------------------------------------

const Child: FC = () => {
  const contextValue = useContext(CounterContext)
  if (!contextValue) return null
  const { setCount, count } = contextValue

  renderLog('Child')

  return (
    <>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>Inc</button>{' '}
    </>
  )
}

function renderLog(input: string) {
  console.log('%s rendered', input)
}
