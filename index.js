const express = require("express");
const cors = require("cors");


const app = express();
const notFound = require('./middleware/notFound')
const handleError = require('./middleware/handleError')

app.use(cors());
app.use(express.json());

let files = [
  {
    id: 1,
    name: "Roque",
    surname: "Chao Rama",
    age: 25,
    content: "Estudent of the University of the Andes",
    date: "2019-05-30T17:30:31.098Z",
    live: true,
  },
  {
    id: 2,
    name: "Juan",
    surname: "Perez",
    age: 30,
    content: "Estudent of the University of London",
    date: "2019-05-30T17:30:31.098Z",
    live: false,
  },
  {
    id: 3,
    name: "Maria",
    surname: "Gomez",
    age: 20,
    content: "Estudent of the University of Helsinki",
    date: "2019-05-30T17:30:31.098Z",
    live: true,
  },
];



app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/files", (request, response) => {
  response.json(files);
});

app.get("/api/files/:id", (request, response) => {
  const id = Number(request.params.id);
  const file = files.find(file => file.id === id);
  if (file) {
    response.json(file);
  } else {
    request.status(404).send("File not found");
  }
});

app.delete("/api/files/:id", (request, response) => {
  const id = Number(request.params.id);
  files = files.filter(file => file.id !== id);
  response.status(204).end();
});


app.post("/api/files", (request, response) => {
  const file = request.body;


  const ids = files.map(file => file.id);
  const maxId = Math.max(...ids);

  const newFile = {
    id: maxId + 1,
    name: file.name,
    surname: file.surname,
    age: file.age,
    content: file.content,
    date: new Date().toISOString(),
    live: file.live || false,
  };


  files = [...files, newFile];

  response.json(newFile);
});


app.use(notFound)
app.use(handleError)


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});