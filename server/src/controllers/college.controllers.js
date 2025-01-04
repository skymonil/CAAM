import College from "../models/College.model.js";

export const addCollege = async (req, res) => {
  const { collegeID, collegeName, address, courses } = req.body;

  try {
    const newCollege = new College({
      collegeID,
      collegeName,
      address,
      courses,
    });

    await newCollege.save();
    console.log(newCollege);

    res
      .status(201)
      .json({ message: "College created successfully", college: newCollege });
  } catch (error) {
    res.status(500).json({ message: "Error creating college", error });
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

export const getCollegeById = async (req, res) => {
  try {
    const college = await College.findById(req.params.id);
    if (!college) return res.status(404).json({ message: "College not found" });
    res.status(200).json(college);
  } catch (error) {
    res.status(500).json({ message: "Error fetching college", error });
  }
};
