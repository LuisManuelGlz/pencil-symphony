const mongoose = require('mongoose');

const URI = process.env.URI;

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(db => console.log("Database is connected... 😎")) // si la conexión es exitosa
  .catch(err => console.log(err));                        // si la conexión falla

module.exports = mongoose;