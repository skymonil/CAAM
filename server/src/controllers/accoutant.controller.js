import StudentDetails from "../models/StudentDetail.model";

export const addFunds = async(req,res)=>{
    const {studentId, amount} = req.body;
    
    if(!studentId|| !amount)
    {
        return res.status(400).json({message: "Invalid Data Request. Ensure Correct Values are provided"})
    }
    try
    {
        const student = await StudentDetails.findById(studentId);
        if(!student)
        {
            return res.status(404).json({message: 'Student Not Found!'});
        }
        console.log("Before: "+student.walletBalance);
        student.walletBalance += amount;

        await student.save()
        console.log("After Adding "+amount+" Balance: "+student.walletBalance)
        console.log("Funds Added Success")
        return res.status(200).json({message: "Funds Added Successfully!"})
    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error Occured!"})
    }
}