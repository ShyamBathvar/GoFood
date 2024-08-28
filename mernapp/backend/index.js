const express = require('express');
const app = express();
const port = process.env.PORT ||  5000;
const mongoDB = require("./db");
mongoDB();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS"); // Add other methods as needed
  res.header("Access-Control-Allow-Credentials", "true"); // Add if handling credentials
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(express.json());
app.use('/api', require("./Routes/CreatUser"));
app.use('/api', require("./Routes/DisplayData"));
app.use('/api', require("./Routes/OrderData"));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
