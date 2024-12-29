const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Express server!');
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
