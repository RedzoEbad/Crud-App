const express = require('express');
const cors = require('cors');
const connectDb = require('./Connection');
const Routes = require('./Routes/Routes');

const server = express();
const Port = 8000;
server.use(cors());
server.use(express.json()); 
server.use('/', Routes);
connectDb();
server.listen(Port, () => {
  console.log("Your server has started on port number " + Port);
});
