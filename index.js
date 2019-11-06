const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2019-05-30T17:30:31.098Z",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2019-05-30T18:39:34.091Z",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: true
  }
]

app.get('/', (req, res) => {
  res.send('Welcome to the homepage')
})

app.get('/notes', (req, res) => {
  res.json(notes)
})

app.get('/notes/:id', (req, res) => {
  const noteId = Number(req.params.id)
  const signleNote = notes.find(note => note.id === noteId)
  if(signleNote){
    res.json(signleNote)
  }else{
    res.json({
      status: 404,
      message: "No note found"
    }).end()
  }
})

app.delete('/notes/:id', (req, res) => {
  const {id} = req.params
  const findNote = notes.find(note => note.id === Number(id))
  if(!findNote){
    res.json({
      status: '404',
      message: 'no note found with the specified id',
    })
  }else{
    const availableNotes = notes.filter(note => note.id !== findNote.id)
    res.json({
      status: 204,
      message: 'deleted',
      availableNotes
    })
  }
})

const generateId = () => {
  const max = notes.length > 0 ? Math.max(...notes.map(n => n.id)) : 0
  return max + 1
}

app.post('/notes', (req, res) => {
  const note = req.body
  
  if (!note){
    return res.json({
      message: 'Please fill the fields'
    })
  }

  const newNote = {
    content: note.content,
    important: note.important || false,
    date: new Date(),
    id: generateId()
  }
  notes = notes.concat(newNote)
  res.status(201).json({
      message: 'Note created',
      notes
    })
})


const port = 3001
app.listen(port)
console.log(`server started on port ${port}`)
