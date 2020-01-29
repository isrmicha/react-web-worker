export const executeWorkerFunction = (payload, func) => eval(func)(payload)
