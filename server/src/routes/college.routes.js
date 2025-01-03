import express from "express";
import College from "../models/College.model.js";

const router = express.Router();

router.post("/add", async (req, res) => {
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
});

router.get("/get", async (req, res) => {
  try {
    const colleges = await College.find();
    res.status(200).json(colleges);
  } catch (error) {
    res.status(500).json({ message: "Error fetching colleges", error });
  }
});

// Get a single college by ID
router.get("/:id", async (req, res) => {
  try {
    const college = await College.findById(req.params.id);
    if (!college) return res.status(404).json({ message: "College not found" });
    res.status(200).json(college);
  } catch (error) {
    res.status(500).json({ message: "Error fetching college", error });
  }
});

// Update a college
// router.put("/:id", async (req, res) => {
//   const { collegeName, address, courses } = req.body;
//   try {
//     const updatedCollege = await College.findByIdAndUpdate(
//       req.params.id,
//       { collegeName, address, courses },
//       { new: true }
//     );
//     res.status(200).json({ message: "College updated successfully", college: updatedCollege });
//   } catch (error) {
//     res.status(500).json({ message: "Error updating college", error });
//   }
// });

// Delete a college
// router.delete("/:id", async (req, res) => {
//   try {
//     await College.findByIdAndDelete(req.params.id);
//     res.status(200).json({ message: "College deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error deleting college", error });
//   }
// });

export default router;
