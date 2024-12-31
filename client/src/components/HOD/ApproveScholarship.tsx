import { useState } from "react"

interface students{
    studentId: string,
    studentName: string,
    scholarshipStatus: string
}
function ApproveScholarship() {
    const [students,setStudents] = useState<students[]>([
        {
            studentId: 'S098',
            studentName: 'Aditya Pai',
            scholarshipStatus: 'applied'
        },
        {
            studentId: 'S060',
            studentName: 'Chirag Varu',
            scholarshipStatus: 'not-applied'
        }
    ]);

    const [selected,setSelected] = useState<Set<string>>()

    const handleCheck = (studentId: string,check: boolean)=>{
        setSelected((prev)=>{
            const newSet = new Set(prev);
            if(check)
            {
                newSet.add(studentId);
            }
            else{
                newSet.delete(studentId)
            }
            return newSet
        })
    }

  return (
    <div className="flex flex-col space-y-4">
        <h1 className="text-2xl font-semibold">Approve Scholarship</h1>
        <div>
            {
                students.map((student)=>{
                    return(
                        <div className="flex justify-between border border-gray-300 p-5 mb-3 rounded-lg shadow-lg text-xl text-gray-700">
                            <div>
                                {student.studentId}
                            </div>
                            <div>
                                {student.studentName}
                            </div>
                            <div>
                                <input type="checkbox" 
                                onChange={(e)=>handleCheck(student.studentId,e.target.checked)}
                                />
                            </div>
                        </div>
                    )
                })
            }
            <div><button className="bg-green-500 px-4 py-2 rounded-lg text-white text-lg hover:bg-green-700" onClick={()=>console.log(selected)}>Approve Selected Students</button></div>
        </div>
    </div>
  )
}

export default ApproveScholarship
