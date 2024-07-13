import express from 'express';
// Import db.js to establish MongoDB connection
import './db.js';
import mainRouter  from './routes/index.js'
import bodyParser from 'body-parser';
import cors from 'cors';
const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('welcome to home page');
});

app.use('/api/v1',mainRouter )

app.listen(8080, () => {
    console.log('server running');
});
