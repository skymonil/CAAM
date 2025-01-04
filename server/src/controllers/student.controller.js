import Student from '../models/Student.model.js';

export const getStudent = async (req, res) => {
    try {
        const StudentEmail = req.student.email;
        const student = await Student.findOne({ email: StudentEmail });

        if (!student) {
            return res.status(404).json({ message: "student not found" });
        }

        res.json({ id: student._id, name: student.name, email: student.email });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error });
    }
};
