require('dotenv').config();
const server = require('./src/app');
const { conn } = require('./src/database.js')

conn.sync({force: false}).then(()=> {
    server.listen(process.env.PORT, 
        ()=>{
            console.log(
                "\n" + "%s listening at " + process.env.PORT + "\n" + Date() + "\n"
            )
        });
});


