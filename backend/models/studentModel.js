const mongoose = require("mongoose")

const Schema = mongoose.Schema

const studentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
}, { timestamps: true })

module.exports = mongoose.model("Student", studentSchema)
