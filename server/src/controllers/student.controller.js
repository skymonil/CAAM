import StudentDetails from "../models/StudentDetail.model.js";

export const fillDetails = async (req, res) => {
  try {
    const {
      studentId,
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
      college,
      scholarship,
    } = req.body;

    if (!studentId || !score || !course || !documents || documents.length !== 4) {
      return res.status(400).json({
        error:
          "Missing or invalid fields. Ensure studentId, score, course, and exactly 4 documents are provided.",
      });
    }

    const documentNames = documents.map((doc) => doc.name);

    const studentDetails = new StudentDetails({
      studentId,
      fullName,
      dob,
      gender,
      phone,
      parentName,
      parentPhone,
      address,
      lastInstitution,
      score: parseFloat(score),
      courseId: course,
      documents: documentNames,
      college: college || "Unknown College", // Default value if college is missing
      scholarship: scholarship || null,
    });

    // Save to database
    await studentDetails.save();

    res.status(201).json({ message: "Student details saved successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
