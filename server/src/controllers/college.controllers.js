import College from "../models/College.model.js";

export const addCollege = async (req, res) => {
  const { collegeID, collegeName, address, globalFees, courses } = req.body;

  try {
    const existingCollege = await College.findOne({ collegeID });
    if (existingCollege) {
      return res.status(400).json({ message: "College ID already exists." });
    }

    const newCollege = new College({
      collegeID,
      collegeName,
      address,
      globalFees: globalFees.map((fee) => ({
        title: fee.title,
        amount: fee.amount,
      })),
      courses: courses.map((course) => ({
        courseName: course.courseName,
        eligibility: course.eligibility,
        baseFee: course.baseFee,
        subject: course.subjects.map((subject) => ({
          subjectName: subject.name,
          marks: {
            min: subject.minMarks,
            max: subject.maxMarks,
          },
        })),
      })),
    });

    // Save to database
    await newCollege.save();
    res.status(201).json({ message: "College added successfully." });
  } catch (error) {
    console.error("Error adding college:", error);
    res.status(500).json({ message: "Failed to add college." });
  }
};

export const getCollege = async (req, res) => {
  try {
    const colleges = await College.find();
    res.status(200).json(colleges);
  } catch (error) {
    res.status(500).json({ message: "Error fetching colleges", error });
  }
};

export const getColleges = async (req, res) => {
  try {
    const colleges = await College.find({}, "_id collegeName");

    if (!colleges || colleges.length === 0) {
      return res.status(404).json({ message: "No colleges found" });
    }

    res.status(200).json(colleges);
  } catch (error) {
    console.error("Error fetching colleges: ", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};
