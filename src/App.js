import React, { useState } from 'react'
import exec from './worker'

const payload = Array(10000)
  .fill()
  .map(() => Math.round(Math.random() * 10000))

const App = () => {
  const [tasks, setTasks] = useState(null)
  const [time, setTime] = useState(null)
  const withoutWebWorkers = () => {
    const initialTime = Date.now()
    setTasks(payload.map(data => data ** 2))
    setTime(Date.now() - initialTime)
  }
  const withWebWorkers = () => {
    const initialTime = Date.now()
    exec(Object.assign([], payload), arr => arr.map(data => data ** 2)).then(
      res => {
        setTime(Date.now() - initialTime)
        setTasks(res)
      }
    )
  }

  return (
    <div>
      <p>Choose :</p>
      <button onClick={withoutWebWorkers} style={{ margin: 10 }}>
        Main Thread (withoutWebWorkers)
      </button>
      <button onClick={withWebWorkers}>Multiple Thread (withWebWorkers)</button>
      {time && <p>tooks {time} ms</p>}
      {tasks &&
        tasks.map((task, index) => <p key={`${task}-${index}`}>{task}</p>)}
    </div>
  )
}

export default App
