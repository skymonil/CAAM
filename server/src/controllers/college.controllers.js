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

export const getColleges = async (req,res) => {
    try {
        const colleges = await College.find({}, '_id collegeName');
    
        if (!colleges || colleges.length === 0) {
          return res.status(404).json({ message: "No colleges found" });
        }
    
        res.status(200).json(colleges);

      } catch (error) {
        console.error("Error fetching colleges: ", error);
        res.status(500).json({ message: "Internal server error", error });
      }
}
