const log = console.log;
const express = require('express');


require('../db/mongoose.js'); //connect to db
const userRouter = require('../routes/user');
const taskRouter = require('../routes/task');


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  log('Listening on port', port);
});


