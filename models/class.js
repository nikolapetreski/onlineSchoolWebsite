const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
},
    body: {
        type: String,
        required: true
        }
        }, { timestamps: true });

        const Class = mongoose.model('Class', classSchema);
        module.exports = Class;