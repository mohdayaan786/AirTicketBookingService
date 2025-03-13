const express = require('express');
const bodyParser = require('body-parser');
const {port} = require('./config/server-config');
const ApiRoutes = require('./routes/index');
const db = require('./models/index');


const setupAndStartServer = async () => {
    const app = express();
    app.use('/api', ApiRoutes);

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
        if(process.env.SYNC_DB){
            db.sequelize.sync({alter: true});
        }
    });
}

setupAndStartServer();