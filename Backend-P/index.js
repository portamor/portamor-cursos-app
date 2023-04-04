const { conn } = require('./src/database.js')
const server   = require('./src/app');

require('dotenv').config();

conn.sync({ force: true}).then(()=> {
  server.listen(process.env.PORT, () => {
    console.log( "\n" + "%s listening at " + process.env.PORT + "\n" + Date() + "\n" )
  });
});


