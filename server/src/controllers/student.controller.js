import StudentDetails from "../models/StudentDetail.model.js";
import Student from "../models/Student.model.js"
export const fillDetails = async (req, res) => {
  try {
    console.log('Request Body:', req.body);
    const studentId = req.user._id;
    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    const collegeId = student.collegeId;

    const {
      fullName,
      dob,
      gender,
      phone,
      parentName,
      parentPhone,
      address,
      lastInstitution,
      score,
      course,
      documents,
    } = req.body;

    if (
      !fullName ||
      !dob ||
      !gender ||
      !phone ||
      !parentName ||
      !parentPhone ||
      !address ||
      !lastInstitution ||
      !score ||
      !course ||
      documents.length != 4
    ) {
      return res.status(400).json({
        error: "Missing required fields. Please provide all the details.",
      });
    }

    const documentNames = documents.map((doc) => doc.name);

    const studentDetails = new StudentDetails({
      fullName,
      dob,
      gender,
      phone,
      parentName,
      parentPhone,
      address,
      lastInstitution,
      course,
      score: parseFloat(score),
      college: collegeId,
    });

    // Save to database
    await studentDetails.save();

    res.status(201).json({ message: "Student details saved successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
