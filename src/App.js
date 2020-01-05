import React, { useState, useEffect } from 'react'
import Worker from 'workerize-loader!./worker' // eslint-disable-line import/no-webpack-loader-syntax

const workersNumber = navigator.hardwareConcurrency - 1

const workers = Array(workersNumber)
  .fill()
  .map(() => new Worker())

const payload = Array(10000)
  .fill()
  .map(() => Math.round(Math.random() * 1000))

export default () => {
  const [tasks, setTasks] = useState(Array(workersNumber).fill(false))
  const [threadDone, setThreadDone] = useState(null)

  useEffect(() => {
    setTasks(Object.assign([...tasks], { [threadDone]: true }))
  }, [threadDone])
  useEffect(() => {
    for (const [index, worker] of workers.entries()) {
      const currentPayload = payload
        .slice(0, payload.length / workersNumber)
        .splice(0, payload.length / workersNumber)

      worker.expensive(currentPayload).then(time => {
        console.log(`Thread ${index} done in ${time}s`)
        setThreadDone(index)
      })
    }
  }, [])

  return tasks.map((task, index) => (
    <div key={`${index}-${task}`}>
      Task {index} {task ? 'done' : 'running'}
    </div>
  ))
}
