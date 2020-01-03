import React, { useState, useEffect } from 'react'
import Worker from 'workerize-loader!./worker' // eslint-disable-line import/no-webpack-loader-syntax

const workers = Array(navigator.hardwareConcurrency - 1)
  .fill()
  .map(() => new Worker())

export default () => {
  const [tasks, setTasks] = useState(
    Array(navigator.hardwareConcurrency).fill(false)
  )
  const [threadDone, setThreadDone] = useState(null)

  useEffect(() => {
    setTasks(Object.assign([...tasks], { [threadDone]: true }))
  }, [threadDone])
  useEffect(() => {
    for (const [index, worker] of workers.entries()) {
      worker
        .expensive(Math.round(Math.random() * 3000))
        .then(() => setThreadDone(index))
    }
  }, [])

  return tasks.map((task, index) => (
    <div key={`${index}-${task}`}>
      Task {index} {task ? 'done' : 'running'}
    </div>
  ))
}
