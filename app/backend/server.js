const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

// Mock client data
const clients = [
  { id: 1, name: "John Doe", age: 30, gender: "M", citizen_status: "permanent_resident" },
  // { id: 1, name: "John Smith", age: 30, gender: "Male" },
  // { id: 1, name: "John Johnson", age: 30, gender: "Male" },
  { id: 2, name: "Jane Smith", age: 25, gender: "Female" },
  { id: 3, name: "Alice Johnson", age: 35, gender: "Female" },
  { id: 4, name: "Michael Brown", age: 40, gender: "Male" },
];

// API endpoint to search clients by name
app.get('/api/clients/search', (req, res) => {
  const { name } = req.query;
  if (!name) {
    return res.status(400).json({ error: "Name query parameter is required" });
  }

  // Filter clients by name with exact word match (case insensitive)
  const matchingClients = clients.filter(client =>
    client.name.toLowerCase().split(" ").includes(name.toLowerCase())
  );

  res.json(matchingClients);
});

// API endpoint to get a specific client by ID
app.get('/api/clients/:id', (req, res) => {
  const { id } = req.params;
  const client = clients.find(client => client.id === parseInt(id, 10));

  if (!client) {
    console.log('Client not found'); // Log when the client is not found
    return res.status(404).json({ error: "Client not found" });
  }

  res.json(client);
});

app.post('/api/submit-form', (req, res) => {
  const formData = req.body;
  
  // mock result for api post req testing
  // call backend url
  // backend will return a json back

  // match this to the current version of result 
  const result = {
    probability: Math.random() * 100,
    interventions: [
      "Attend job skills workshop: increased by xx%",
      "Participate in language improvement classes: increased by xx%",
      "Join professional networking events: increased by xx%"
    ]
  };
  // optional process of the result 
  res.json(result);
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
