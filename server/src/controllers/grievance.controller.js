import Grievance from "../models/Grievance.model.js";
import Student from "../models/Student.model.js";

//Addition of new Grievance by Student
export const addGrievance = async(req,res) =>{

    const { studentId, grievanceTitle, grievanceDesc } = req.body;

    if(!studentId || !grievanceDesc|| !grievanceTitle)
    {
        return res.status(400).json({message: 'All Fields are Required!'});
    }

    try
    { 
        const existingStudent = await Student.findById(studentId);
    
        if(!existingStudent)
        {
            return res.status(400).json({message: 'Student not Found!'});
        }
    
        const grievance = new Grievance({
            studentId,
            title: grievanceTitle,
            description: grievanceDesc,
            status: 'Pending'
        });
    
        const savedGrievance = await grievance.save();
    
        res.status(200).send({
            message: 'Grievance Added Successfully',
            grievance: savedGrievance
        });
    }
    catch(error)
    {
        console.log('Error Occured while creating Grievance: '+error);
        res.status(500).json({message: 'Internal Server Error Occured!'});
    }
}

//Fetching of New Grievances by HOD Admin
export const fetchGrievances = async(req,res)=>{

    try
    {
        const grievances = await Grievance.find();

        if(grievances.length === 0)
        {
            return res.status(200).json({
                success: false,
                message: `No Grievances Found`
            });
        }

        res.status(200).json({
            success: true,
            data: grievances
        })

    }
    catch(error)
    {
        console.log('Error While Fetching Grievances: '+error);
        res.status(500).json({message: 'Internal Server Error Occured!'})
    }
}

//Approval of Grievance by HOD based on Grievance ID
export const resolveGrievance = async(req,res)=>{
    const { grievanceId } = req.params;

    if(!grievanceId)
    {
        return res.status(400).json({message: 'Grievance ID is Required!'});
    }

    try
    {
        const grievance = await Grievance.findById(grievanceId);

        if(!grievance)
        {
            return res.status(404).json({message: 'Grievance Not Found!'});
        }

        grievance.status = 'Resolved';

        await grievance.save();

        res.status(200).json({message: 'Grievance Resolved Successfully'});
    }
    catch(error)
    {
        console.log('Error Occured While Approving Grievance: '+error);
        res.status(500).json({message:'Internal Server Error Occured!'})
    }
}