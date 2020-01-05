export const expensive = payload => {
  const start = Date.now()
  payload.map(number => number ** Math.random() * 20)
  return Date.now() - start
}
