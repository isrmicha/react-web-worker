export const expensive = payload => {
  const start = Date.now()
  payload.map(number =>
    console.log(`${number ** 2} => I/O OPERATIONS SLOW THE PERFORMANCE!`)
  )
  return Date.now() - start
}
