import express from 'express';
import routes from './routes/index.js';
import db from './config/connections.js';
const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', routes);
db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
    });
});
