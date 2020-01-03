export const expensive = (time, index) => {
  const start = Date.now()
  let count = 0
  while (Date.now() - start < time) count++

  return count
}
