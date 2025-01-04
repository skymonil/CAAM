import { useEffect, useState } from "react"
import HOD_Navbar from "../../components/HOD/HOD_Navbar"
import axios from "axios"

interface grievance {
  _id: string
  createdAt: string
  updatedAt: string
  studentId: string
  title: string
  description: string
  status: string
}
function GrievanceList() {
  const [isPendingOpen,setPendingOpen] = useState<boolean>(true)
  const [grievances, setgrievances] = useState<grievance[]>([]);

  const fetchGrievances = async() =>{
    try{
      const response = await axios.get('http://localhost:5000/api/grievance/fetch-grievances');
      if(response.data.success)
      {
        console.log(response.data.data)
        setgrievances(response.data.data)
      }
    }
    catch(error)
    {
      console.log('Error')
    }
  }
  useEffect(()=>{

    fetchGrievances();
  },[isPendingOpen]);

  const approveGrievance = async(grievanceId: string): Promise<void> => {
    
    try
    {
      await axios.put(`http://localhost:5000/api/grievance/resolve-grievance/${grievanceId}`);
      fetchGrievances()
    }
    catch(error)
    {
      console.log('Error');
    }
  }

  const filteredGrievances = grievances.filter((grievance)=> grievance.status === (isPendingOpen?'Pending':'Resolved'))
return(
  <>
  <HOD_Navbar/>
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
                  <th className="py-3 px-4">
                    Date
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
                          <td>
                            {grievance.status === 'Pending'? `${grievance.createdAt.split('T')[0]}`: `${grievance.updatedAt.split('T')[0]}`}
                          </td>
                          <td className='max-w-md break-words p-4 font-semibold'>
                            {grievance.title}
                          </td>
                          <td className='max-w-xl break-all p-4'>
                            {grievance.description}
                          </td>
                          {isPendingOpen && <td className="p-4">
                            <button className='bg-green-400 text-white px-4 py-2 rounded-lg text-base'
                              onClick={() => approveGrievance(grievance._id)}
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
  </>
  )
}

export default GrievanceList
