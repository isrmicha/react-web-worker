import Worker from 'workerize-loader!./workerFunc' // eslint-disable-line import/no-webpack-loader-syntax

let workersNumber = navigator.hardwareConcurrency - 1

export default async (payload, func) => {
  if (payload.length < workersNumber) {
    workersNumber = payload.length
  }
  const workers = Array(workersNumber)
    .fill()
    .map(() => new Worker())
  const splittedPayloadLength = Math.round(payload.length / workersNumber)
  const results = Array(workersNumber).fill()
  for (const [index, worker] of workers.entries()) {
    const currentPayload =
      index + 1 === workersNumber
        ? payload
        : payload.splice(0, splittedPayloadLength)

    results[index] = worker.executeWorkerFunction(
      currentPayload,
      func.toString()
    )
  }
  const result = await Promise.all(results)
  workers.forEach(worker => worker.terminate())
  return result.flat(Infinity)
}
