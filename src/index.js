const express = require('express');
const bodyParser = require('body-parser');
const { port } = require('./config/server-config');
const ApiRoutes = require('./routes/index');
const db = require('./models/index');

const setupAndStartServer = async () => {
    const app = express();

    // ✅ Correct order: Add body-parser middleware first
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // ✅ Then define routes
    app.use('/api', ApiRoutes);

    // Server listen
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
        if (process.env.SYNC_DB) {
            db.sequelize.sync({ alter: true });
        }
    });
};

setupAndStartServer();
