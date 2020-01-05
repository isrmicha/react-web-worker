import React, { useState, useEffect } from 'react'
import Worker from 'workerize-loader!./worker' // eslint-disable-line import/no-webpack-loader-syntax

const workersNumber = navigator.hardwareConcurrency - 1

const workers = Array(workersNumber)
  .fill()
  .map(() => new Worker())

const payload = Array(10000000)
  .fill()
  .map(() => Math.round(Math.random() * 10000))

export default () => {
  const [tasks, setTasks] = useState(Array(workersNumber).fill(false))
  const [threadDone, setThreadDone] = useState(null)

  useEffect(() => {
    setTasks(Object.assign([...tasks], { [threadDone]: true }))
  }, [threadDone])
  useEffect(() => {
    const splittedPayload = payload.length / workersNumber
    console.log(splittedPayload)
    for (const [index, worker] of workers.entries()) {
      const currentPayload =
        index + 1 === workersNumber
          ? payload
          : payload.splice(0, splittedPayload)

      worker.expensive(currentPayload).then(time => {
        console.log(`Thread ${index} done in ${time}ms`)
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
