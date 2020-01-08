import React, { useState, useEffect } from 'react'
import exec from './worker'
import styled from 'styled-components'

const payload = Array(1000)
  .fill()
  .map(() => Math.round(Math.random() * 10000))

const App = () => {
  const [tasks, setTasks] = useState(null)
  const [rotate, setRotate] = useState(0)
  const withoutWebWorkers = () => setTasks(payload.map(data => data ** 2))
  const withWebWorkers = () =>
    exec(Object.assign([], payload), arr => arr.map(data => data ** 2))
      .then(res => setTasks(res))
      .catch(err => console.log(err))
  useEffect(() => {
    setTimeout(() => setRotate(rotate + 15), 25)
  }, [rotate])

  return (
    <div>
      <p>Choose :</p>
      <StyledDiv rotate={rotate} />
      <button onClick={withoutWebWorkers} style={{ margin: 10 }}>
        Main Thread (withoutWebWorkers)
      </button>
      <button onClick={withWebWorkers}>Multiple Thread (withWebWorkers)</button>
      {tasks &&
        tasks.map((task, index) => <p key={`${task}-${index}`}>{task}</p>)}
    </div>
  )
}

export default App

const StyledDiv = styled.div`
  width: 250px;
  height: 50px;
  transform: rotate(${({ rotate }) => rotate}deg);
  background-color: red;
  margin: 100px;
`
