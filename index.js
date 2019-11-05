const http = require('http')

const app = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/pain'})
  res.end('hello')
})

const port = 3001
app.listen(port)
console.log(`server started on port ${port}`)
