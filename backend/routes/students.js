const express = require("express")
const { createStudent, getStudents, getStudent, updateStudent, deleteStudent } = require("../controllers/studentController")
const router = express.Router()

router.get('/', getStudents)
router.get('/:id', getStudent)
router.post('/', createStudent)
router.patch('/:id', updateStudent)
router.delete('/:id', deleteStudent)

module.exports = router
