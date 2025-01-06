import Student from "../models/Student.model.js";
import College from "../models/College.model.js";

export const getCourses = async (req, res) => {
  try {
    const { email } = req.student; 
    const student = await Student.findOne({ email }).populate("collegeId");

    if (!student || !student.collegeId) {
      return res.status(404).json({ message: "Student or college not found." });
    }

    const college = await College.findById(student.collegeId).select("courses collegeName");

    if (!college || !college.courses) {
      return res.status(404).json({ message: "No courses found for this college." });
    }

    res.status(200).json({
      collegeName: college.collegeName,
      courses: college.courses.map((course) => ({
        id: course._id,
        name: course.courseName,
        duration: "3 Years", 
        fees: course.fees.map((fee) => `${fee.title}: ₹${fee.amount}`).join(", "),
        subjects: course.subject.map((sub) => sub.subjectName).join(", "),
      })),
    });
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
