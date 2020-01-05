export const expensive = payload => {
  const start = Date.now()
  payload.forEach(number =>
    console.log(`${number} => I/O OPERATIONS SLOW THE PERFORMANCE!`)
  )
  return Date.now() - start
}
