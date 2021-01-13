const express = require('express');
const db = require('./model/dataBase')
const bodyParser = require('body-parser');
const routes = require('./routes/index')

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/', routes);

db.mongoose.connect(db.url, {
  useNewUrlParser: true, 
  useUnifiedTopology: true
}).then(() => {
  console.log('connected to database...');
}).catch(err => {
  console.log('unable to connect to database', err);
  process.exit();
});

app.listen(4000, function(){
    console.log('app is listening on port 4000');
})