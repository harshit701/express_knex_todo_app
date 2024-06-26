import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes/index.js';
import 'dotenv/config';

const app = express();
const port = process.env.PORT || 4200;

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.use('/', routes);

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});