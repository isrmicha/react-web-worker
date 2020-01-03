const compression = require('compression')
const express = require('express')
const app = express()
const port = process.env.PORT || 80
const path = require('path')
app.use(compression())

app.use(express.static(path.join(__dirname, './build')))

app.listen(port, () =>
  console.log(`Server started at http://localhost:${port}`)
)
