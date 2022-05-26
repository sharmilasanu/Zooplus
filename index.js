const express = require('express'),
      morgan = require('morgan'),
      bodyParser = require('body-parser');
const app = express();

app.get('/', (req, res) => {
    res.sendFile('public/index.html', { root: __dirname });
  });

  app.use('/staticfiles',express.static('public'));

app.use((err,req,res, next) =>{
console.error(err,stack);
res.status(500).send('Something Broke!');
});

app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
  });