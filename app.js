const path = require('path');
const engine = require('ejs-mate');
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const errorHandler = require('./src/middlewares/error-handler');
const sermonsRoutes = require('./src/routes/sermons-routes');

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/sermon-crud-example';
const port = process.env.PORT || 8080;
const app = express();

// connect to db
mongoose
  .connect(mongoUri, {
    useNewURLparser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('connected to db'))
  .catch((err) => console.error(`unable to connect to db: ${err.message}`));

// setup view engine
app.engine('ejs', engine);
app.set('views', path.join(__dirname, './src/views'));
app.set('view engine', 'ejs');
// setup static routing middleware
app.use(express.static(path.join(__dirname, 'public')));
// setup body parsing middleware
app.use(express.urlencoded({ extended: true }));
// setup method-override middleware
app.use(methodOverride('_method'));
// setup root redirect
app.get('/', (req, res) => res.redirect('/sermons'));
// setup sermons routing
app.use('/sermons', sermonsRoutes);
// setup error-handling middleware
app.use(errorHandler);
// start express app
app.listen(port, () => console.log(`listening at http://localhost:${port}`));
