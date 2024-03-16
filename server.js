const app = require('./app.js');
const dotenv = require('dotenv').config( {path: './config.env'} );

const PORT = process.env.PORT || 3000;

app.listen(PORT, (err) => {
    if(err) return console.log('Error starting server');
    console.log(`Server running on port ${PORT}`);
});