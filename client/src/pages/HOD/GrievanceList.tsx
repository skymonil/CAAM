import { useState } from "react"

interface grievance {
  grievanceId: string,
  studentId: string,
  studentName: string
  title: string
  description: string
  status: string
}
function GrievanceList() {
  const [isPendingOpen,setPendingOpen] = useState<boolean>(true)
  const [grievances, setgrievances] = useState<grievance[]>([
    {
      grievanceId: '501',
      studentId: 'S058',
      studentName: 'Chirag',
      title: 'Attendance',
      description: 'PLease grant me extra attendance',
      status: 'pending'
    },
    {
      grievanceId: '502',
      studentId: 'S058',
      studentName: 'Chirag',
      title: 'Attendance',
      description: 'PLease grant me extra attendance plz',
      status: 'pending'
    },
    {
      grievanceId: '503',
      studentId: 'S058',
      studentName: 'Chirag',
      title: 'Attendance',
      description: 'PLease grant me extra attendance plz',
      status: 'pending'
    },
    {
      grievanceId: '504',
      studentId: 'S058',
      studentName: 'Chirag',
      title: 'Attendance',
      description: 'PLease grant me extra attendance plz',
      status: 'pending'
    }
  ]);
  const approveGrievance = (grievanceId: string): void => {
    //Temporary logic to approve grievance
    setgrievances((prevGrievances)=>
    prevGrievances.map((grievance)=> grievance.grievanceId === grievanceId ? {...grievance,status: 'resolved'}:grievance))
  }

  const filteredGrievances = grievances.filter((grievance)=> grievance.status === (isPendingOpen?'pending':'resolved'))
return(
    <div className='max-w-screen lg:max-w-6xl min-h-96 p-5 shadow-lg m-auto'>
      <div>
        <h2 className='text-3xl font-semibold'>Grievances Addressal</h2>
          <div className="flex justify-evenly font-semibold py-5 text-xl">
            <div className={`${isPendingOpen?'text-green-400 border-b-2 border-green-500':''} cursor-pointer`} onClick={()=>setPendingOpen(true)}>
              Pending Grievances
            </div>
            <div className={`${!isPendingOpen ? 'text-red-400 border-b-2 border-red-500': '' } cursor-pointer`} onClick={()=>setPendingOpen(false)}>
              Approved Grievances
            </div>
          </div>
          <div className="flex justify-center">
            <table border={2} className='border border-gray-200 overflow-x-auto'>
              <thead>
                <tr className='bg-gray-100 text-gray-700 border-b border-gray-200'>
                  <th className='py-3 px-4'>
                    Student ID
                  </th>
                  <th className='py-3 px-4'>
                    Name
                  </th>
                  <th className='py-3 px-4'>
                    Title
                  </th>
                  <th className='py-3 px-4'>
                    Description
                  </th>
                  {isPendingOpen&&<th className='py-3 px-4'>
                    Action
                  </th>}
                </tr>
              </thead>
              <tbody>
                {
                  filteredGrievances.map((grievance) => {
                    return (
                    <tr className='border-b border-gray-200'>
                          <td className='p-4 font-semibold'>
                            {grievance.studentId}
                          </td>
                          <td className='p-4 break-words font-semibold'>
                            {grievance.studentName}
                          </td>
                          <td className='max-w-md break-words p-4 font-semibold'>
                            {grievance.title}
                          </td>
                          <td className='max-w-xl break-all p-4'>
                            {grievance.description}
                          </td>
                          {isPendingOpen && <td className="p-4">
                            <button className='bg-green-400 text-white px-4 py-2 rounded-lg text-base'
                              onClick={() => approveGrievance(grievance.grievanceId)}
                            >Resolve</button>
                          </td>}
                        </tr>)
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
    </div>
  )
}

export default GrievanceList
