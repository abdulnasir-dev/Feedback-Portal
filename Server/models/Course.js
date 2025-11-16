const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true ,
    },
    image:{
        type: String,
        default: "",
    },
    type:{
        type: String,
        enum: ['course', 'event'],
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
},{ timestamps: true });    

module.exports = mongoose.model('Course', CourseSchema);