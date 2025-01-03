import { Schema, model } from "mongoose";

const collegeSchema = Schema({
  id:{
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  courses: [
    {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
  feeStructure: [
    {
      title: {
        type: String,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
    },
  ],
}, {timestamps:true});

const College = model("College", collegeSchema);

export default College;
