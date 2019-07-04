const express = require('express');
const path = require('path');
require('./db/mongoose.js');

const userRouter = require('./routes/userRouter');
const taskRouter = require('./routes/taskRouter');

const app = express();
const port = process.env.PORT || 3000;

const publicPath = path.join(__dirname, './static');
const viewsPath = path.join(__dirname, './views');

app.set('view engine', 'pug');
app.set('views', viewsPath);

app.use(express.static(publicPath));


app.use(express.json());

app.get('', (req, res) => {
  res.send('wHP GPES THAR?')
});

app.use('/users', userRouter);
app.use('/tasks', taskRouter);

app.listen(port, () => {
  console.log('Listening on port', port);
});
