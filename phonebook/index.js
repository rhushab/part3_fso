const express = require('express');
const app = express();
app.use(express.json());
var morgan = require('morgan');
app.use(express.static('build'));
morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(
  morgan(
    ':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]'
  )
);
const cors = require('cors');

app.use(cors());
const currentDate = new Date();
//write code to log HTTP POST requests to the console
let phonebook = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

console.log('express');

app.get('/', (request, response) => {
  response.send('<h3>Hello World!</h3>');
});

app.get('/api/persons', (request, response) => {
  response.send(phonebook);
});

app.get('/info', (request, response) => {
  response.send(
    `<p>The number of people in Phonebook are: ${phonebook.length}</p>
     ${currentDate}`
  );
});

app.get(`/api/persons/:id`, (request, response) => {
  const id = Number(request.params.id);
  const person = phonebook.find((person) => person.id === id);
  if (person) {
    response.send(person);
  } else {
    console.log('404 found');
    response.status(404).end();
  }
});

app.delete(`/api/persons/:id`, (request, response) => {
  const id = Number(request.params.id);
  phonebook = phonebook.filter((person) => person.id !== id);
  response.status(204).end();
  console.log('deleted');
});
const generateId = () => {
  return Math.floor(Math.random() * 10000);
};
app.post(`/api/persons`, (request, response) => {
  const body = request.body;
  if (!body.name) {
    return response.status(400).json({
      error: 'name missing',
    });
  }
  if (!body.number) {
    return response.status(400).json({
      error: 'number missing',
    });
  }
  if (phonebook.find((person) => person.name === body.name)) {
    return response.status(400).json({
      error: 'name must be unique',
    });
  }
  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };
  phonebook = phonebook.concat(person);
  response.json(person);
  //get morgan to show HTTP POST requests
  console.log(morgan.token);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`Server running on ${PORT}`);
