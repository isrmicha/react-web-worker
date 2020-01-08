// eslint-disable-next-line no-eval
export const executeWorkerFunction = (payload, func) => eval(func)(payload)
