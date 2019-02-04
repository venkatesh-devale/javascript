const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
        .then(() => console.log('Connected to DB...'))
        .catch((err) => console.log('Error connecting to DB...'));

const courseSchema = mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    data: Date,
    isPublised: Boolean,
    price: Number
})



 const Course = mongoose.model('Course', courseSchema);

// const course = new Course({
//     name: 'ReactJS course',
//     author: 'venky',
//     tags: ['React', 'frontend'],
//     isPublised: true
// });

// async function createCourse() {
//     const result = await course.save();
//     console.log(result);
// }

//createCourse();

async function getCourses() {
    return await Course.find({ isPublished: true })
    .or([{  price: { $gte : 15 } }, { name: /.*by.*/ }])
    .sort({ price: -1 })
    .select('name author price');
}

async function run() {
    const courses = await getCourses();
    console.log(courses);
}

run();
