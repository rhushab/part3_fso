const express = require('express');
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());
app.use(express.static('build'));
const mongoose = require('mongoose');

// const url = `mongodb+srv://rhushabhbontapallee:${password}@cluster0.gtq4hc8.mongodb.net/noteApp?retryWrites=true&w=majority`;

// mongoose.set('strictQuery', false);
// mongoose.connect(url);

let notes = [
  {
    id: 1,
    content: 'HTML is easy',
    important: true,
  },
  {
    id: 2,
    content: 'Browser can execute only JavaScript',
    important: false,
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    important: true,
  },
];

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

const Note = mongoose.model('Note', noteSchema);

app.get('/', (request, response) => {
  response.send('<h3>Hello World!</h3>');
});

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

app.get('/api/notes', (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes);
  });
});
const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1;
};
app.get('/api/notes/:id', (request, response) => {
  console.log('individual note');
  const id = Number(request.params.id);
  console.log('id', id);
  const note = notes.find((note) => note.id === id);
  console.log('note', note);
  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter((note) => note.id !== id);

  response.status(204).end;
});

app.post('/api/notes', (request, response) => {
  const body = request.body;
  if (!body.content) {
    return response.status(400).json({
      error: 'content missing',
    });
  }
  const note = {
    content: body.content,
    important: body.important || false,
    id: generateId(),
  };

  notes = notes.concat(note);
  console.log(note);
  response.json(note);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`Server running on ${PORT}`);
