import email from './routers/email';
import cors, { CorsOptions } from 'cors';

require('dotenv').config();
const express = require( "express" );

const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3001; 

const corsOptions: CorsOptions = {
    origin: '*',
    credentials: true
}
app.use(cors(corsOptions))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/email', email);


app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );