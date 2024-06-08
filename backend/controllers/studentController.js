const mongoose = require("mongoose");
const Student = require("../models/studentModel");

const getStudents = async (req, res) => {
    try {
        const response = await Student.find({}).sort({ createdAt: -1 });
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getStudent = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such student" });
    }

    try {
        const response = await Student.findById(id);
        if (!response) {
            return res.status(404).json({ error: "No such student" });
        }

        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const createStudent = async (req, res) => {
    const { name, address, age } = req.body;

    try {
        const response = await Student.create({ name, address, age });
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateStudent = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such student" });
    }

    try {
        const response = await Student.findOneAndDelete({ _id: id }, {
            ...req.body
        });

        if (!response) {
            return res.status(404).json({ error: "No such student" });
        }

        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteStudent = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such student" });
    }

    try {
        const response = await Student.findOneAndDelete({ _id: id });
        if (!response) {
            return res.status(404).json({ error: "No such student" });
        }

        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    getStudents,
    getStudent,
    createStudent,
    updateStudent,
    deleteStudent
};
