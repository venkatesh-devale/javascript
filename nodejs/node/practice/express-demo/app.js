const helmet = require('helmet');
const express = require('express');
const morgan = require('morgan');
const courses = require('./routes/courses');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(helmet());
app.use(morgan('tiny'));
app.use('/api/courses', courses);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

