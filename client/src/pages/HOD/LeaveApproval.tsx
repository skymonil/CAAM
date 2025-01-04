import { useEffect, useState } from "react"
import HOD_Navbar from "../../components/HOD/HOD_Navbar"
import axios from "axios";

interface Leave {
    _id: string,
    startDate: string,
    endDate: string,
    reason: string,
    status: string
}
function LeaveApproval() {
    const [leave, setLeave] = useState<Leave[]>([]);
    const [selected,setSelected] = useState<string>('Pending')

    const fetchLeaves = async() =>{
        try
        {
            const response = await axios.get('http://localhost:5000/api/leave/fetch-leaves');
            if(await response.data.success)
            {
                setLeave(response.data.leaves)
            }
        }
        catch(error)
        {
            console.log(error)
        }
    }
    useEffect(()=>{
        fetchLeaves()
    },[])

    return (
        <>
            <HOD_Navbar />
            <div className="max-w-5xl min-h-96 shadow-xl m-auto p-4 ">
                <div>
                    <h1 className="text-3xl font-semibold">Leave Approval</h1>
                </div>
                <div className="flex justify-evenly text-xl py-3">
                    <div onClick={()=>setSelected('Pending')} className={`${selected === 'Pending'?'text-blue-500 border-b-2 border-blue-600':''} cursor-pointer`}>Pending</div>
                    <div onClick={()=>setSelected('Rejected')} className={`${selected === 'Rejected'?'text-red-500 border-b-2 border-red-600':''} cursor-pointer`}>Rejected</div>
                    <div onClick={()=>setSelected('Approved')} className={`${selected === 'Approved'?'text-green-500 border-b-2 border-green-600':''} cursor-pointer`}>Approved</div>
                </div>
                {
                    leave.filter((leave)=>leave.status === selected).map((leave)=><LeaveTemplate key = {leave._id} leave={leave} fetchLeaves = {fetchLeaves}/>)
                }
            </div>
        </>
    )
}

const LeaveTemplate = ({leave, fetchLeaves}:{leave:Leave, fetchLeaves: ()=> void})=>{

    const handleApproval = async(leaveId: string) =>{
        try
        {
            await axios.put(`http://localhost:5000/api/leave/approve-leave/${leaveId}`);
            fetchLeaves();
        }
        catch(error)
        {
            console.log('Error')
        }
    }

    const handleRejection = async(leaveId: string) =>{
        try
        {
            await axios.put(`http://localhost:5000/api/leave/reject-leave/${leaveId}`);
            fetchLeaves();
        }
        catch(error)
        {
            console.log('Error')
        }
    }
    return(
        <div className="p-2 border-t border-b border-gray-300 rounded-lg space-y-2 my-4">
                            <div>
                                <span className="font-semibold">Leave ID: </span>
                                <span>{leave._id}</span>
                            </div>
                            <div>
                                <span className="font-semibold">Starting From: </span>
                                <span>{leave.startDate.split('T')[0]}</span>
                            </div>
                            <div>
                                <span className="font-semibold">Till: </span>
                                <span>{leave.endDate.split('T')[0]}</span>
                            </div>
                            <div>
                                <span className="font-semibold">Description: </span>
                                <span>{leave.reason}</span>
                            </div>
                            <div className={`space-x-5 font-semibold py-2 ${(leave.status === 'Pending')?'flex':'hidden'}`}>
                                <button className="bg-green-500 text-white px-4 py-2 rounded-lg"
                                onClick={()=>handleApproval(leave._id)}
                                >
                                    Approve Leave
                                </button>
                                <button className="bg-red-950 text-white px-4 py-2 rounded-lg"
                                onClick={()=>handleRejection(leave._id)}
                                >
                                    Reject Leave
                                </button>
                            </div>
                        </div>
    )
}
export default LeaveApproval
