import Student from '../models/Student.model.js';

export const getStudent = async (req, res) => {
    try {
        const StudentEmail = req.student.email;
        const student = await Student.findOne({ email: StudentEmail });

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.json({ id: student._id, name: student.name, email: student.email });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error });
    }
};

export const getAllStudent = async (req, res) => {
    try {
        console.log("Hello");
        
        const students = await Student.find();

        if (!students || students.length === 0) {
            return res.status(404).json({ message: "No students found" });
        }

        res.json(students);
    } catch (error) {
        console.error("Error in getting all students: ", error);
        res.status(500).json({ message: "Internal Server error", error });
    }
};
