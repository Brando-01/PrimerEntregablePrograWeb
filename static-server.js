import express from 'express'
import path from 'path'

const app = express()
const port = process.env.PORT || 8080

const distPath = path.join(process.cwd(), 'dist')
app.use(express.static(distPath))

app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'))
})

app.listen(port, () => {
  console.log(`Static server listening on port ${port}`)
})
