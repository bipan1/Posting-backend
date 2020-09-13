import * as mongoose from 'mongoose';
import app from './src/app'

mongoose.connect('mongodb://localhost:27017:testdb', {useNewUrlParser : true, useUnifiedTopology : true});

const db = mongoose.connection;

db.on('error', (err) => {
    console.log(err);
});


db.once('open', () => {
    console.log('Database connection established');
})
const PORT = 8002;

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
});

