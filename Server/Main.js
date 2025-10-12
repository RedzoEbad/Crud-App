const express = require('express');
const cors = require('cors');
const connectDb = require('./Connection');
const Routes = require('./Routes/Routes');
const path = require('path');

const server = express();
const Port = process.env.PORT || 8000;

server.use(cors());
server.use(express.json());

// ✅ All backend routes start with /api
server.use('/api', Routes);

// ✅ Serve the built frontend (now inside Server/dist)
server.use(express.static(path.join(__dirname, 'dist')));

// ✅ For any route not handled by API, return React index.html
server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// ✅ Connect to database
connectDb();

// ✅ Start server
server.listen(Port, () => {
  console.log(`✅ Server started on port number ${Port}`);
});
