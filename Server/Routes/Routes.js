const express = require('express');
const Router = express.Router();
const {Handle_Delete_Request , Handle_Get_Request , Handle_Post_Request  ,Handle_Put_Request} = require('../Controller/Controller');

Router.get('/' , Handle_Get_Request);
Router.post('/post' , Handle_Post_Request);
Router.delete('/delete/:id' , Handle_Delete_Request);
Router.put('/put/:id' , Handle_Put_Request);

module.exports = Router;