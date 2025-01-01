import { useState } from "react"
import HOD_Navbar from "../../components/HOD/HOD_Navbar"

interface Leave {
    leaveId: string,
    startDate: string,
    endDate: string,
    description: string,
    status: string
}
function LeaveApproval() {
    const [leave, _setLeave] = useState<Leave[]>([
        {
            leaveId: '00998',
            startDate: '12/12/24',
            endDate: '24/12/24',
            description: 'Welding Ceremony',
            status: 'approved'
        },
        {
            leaveId: '00998',
            startDate: '12/12/24',
            endDate: '24/12/24',
            description: 'Wedding Ceremony',
            status: 'pending'
        },
        {
            leaveId: '00998',
            startDate: '12/12/24',
            endDate: '24/12/24',
            description: 'Wedding Ceremony',
            status: 'pending'
        }
    ])
    const [selected,setSelected] = useState<string>('pending')
    return (
        <>
            <HOD_Navbar />
            <div className="max-w-5xl min-h-96 shadow-xl m-auto p-4 ">
                <div>
                    <h1 className="text-3xl font-semibold">Leave Approval</h1>
                </div>
                <div className="flex justify-evenly text-xl py-3">
                    <div onClick={()=>setSelected('pending')} className={`${selected === 'pending'?'text-blue-500 border-b-2 border-blue-600':''} cursor-pointer`}>Pending</div>
                    <div onClick={()=>setSelected('rejected')} className={`${selected === 'rejected'?'text-red-500 border-b-2 border-red-600':''} cursor-pointer`}>Rejected</div>
                    <div onClick={()=>setSelected('approved')} className={`${selected === 'approved'?'text-green-500 border-b-2 border-green-600':''} cursor-pointer`}>Approved</div>
                </div>
                {
                    leave.filter((leave)=>leave.status === selected).map((leave)=><LeaveTemplate leave={leave}/>)
                }
            </div>
        </>
    )
}

const LeaveTemplate = ({leave}:{leave:Leave})=>{
    return(
        <div className="p-2 border-t border-b border-gray-300 rounded-lg space-y-2 my-4">
                            <div>
                                <span className="font-semibold">Leave ID: </span>
                                <span>{leave.leaveId}</span>
                            </div>
                            <div>
                                <span className="font-semibold">Starting From</span>
                                <span>{leave.startDate}</span>
                            </div>
                            <div>
                                <span className="font-semibold">Till: </span>
                                <span>{leave.endDate}</span>
                            </div>
                            <div>
                                <span className="font-semibold">Description: </span>
                                <span>{leave.description}</span>
                            </div>
                            <div className={`space-x-5 font-semibold py-2 ${(leave.status === 'pending')?'flex':'hidden'}`}>
                                <button className="bg-green-500 text-white px-4 py-2 rounded-lg">
                                    Approve Leave
                                </button>
                                <button className="bg-red-950 text-white px-4 py-2 rounded-lg">
                                    Reject Leave
                                </button>
                            </div>
                        </div>
    )
}
export default LeaveApproval
