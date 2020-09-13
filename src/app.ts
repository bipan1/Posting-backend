import * as express from 'express';
import * as morgan from 'morgan';
import router from './routes'
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

// const PostRoute = require("./routes/Post")

const app = express();

app.use(morgan('dev'));
app.use(cors())
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use("/api", router)

// app.use("/api/post", PostRoute)
export default app;