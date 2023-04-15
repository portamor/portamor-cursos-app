const { conn } = require('./src/database.js')
const serverApp   = require('./src/app');

require('dotenv').config();

conn.sync({ alter: true }).then(()=> {
  serverApp.listen(process.env.PORT, () => {
    console.log( "\n" + "%s listening at " + process.env.PORT + "\n" + Date() + "\n" )
  });
});


