import { Wallet, IndianRupee, Plus } from 'lucide-react'
import Navbar from './Navbar'
import React, { useState } from 'react'
import Task from '../../components/WalletTask'

function WalletPage(): React.ReactElement {
  const [isPendingExpOpen, setPendingExpOpen] = useState<boolean>(false)
  interface pendingTask {
    date: string,
    amount: string,
    particulars: string
  }
  interface completedTask {
    date: string,
    amount: string,
    particulars: string,
    status: boolean
  }
  const [pendingTasks, setPendingTasks] = useState<pendingTask[]>([{
    date: "23/12/2024",
    amount: "500",
    particulars: "Journal"
  },
  {
    date: "23/12/2024",
    amount: "600",
    particulars: "Ledger"
  }])
  const [completedTasks, setCompletedTasks] = useState<completedTask[]>([{
    date: "24/12/2024",
    amount: "62500",
    particulars: "Fees",
    status: false
  },])
  return (
    <div>
      <Navbar />
      <div className='p-2 md:py-4 w-3/4 m-auto'>
        {/* Heading */}
        <div className='my-3 text-3xl font-semibold mb-6'>
          <span>
            Your Wallet
          </span>
        </div>

        {/* Wallet Balance Container */}
        <div className='min-w-screen shadow-lg flex flex-col lg:flex-row md:flex-row  justify-between gap-5 bg-blue-100 p-5'>
          <div className='flex flex-col lg:flex-row md:flex-row text-3xl gap-2 items-center'>
            <Wallet size={40} className='text-blue-900' />
            <span className='text-gray-600 text-lg lg:text-3xl'>Current Balance: </span>
            <span className='flex items-center font-semibold text-2xl lg:text-3xl'>
              <IndianRupee size={24} />
              <span>5,000</span>
            </span>
          </div>

          {/* Add Funds Button */}
          <div className='flex justify-center lg:justify-end px-3'>
            <button className='bg-blue-500 text-white px-3 py-3 rounded-lg hover:bg-blue-700 text-lg'>
              <span className='flex items-center gap-1'>
                <Plus size={20} /><span>Add Funds</span>
              </span>
            </button>
          </div>
        </div>
        <div className='py-5 flex justify-evenly px-2 text-xl md:text-base font-semibold cursor-pointer'>
          <div className={`${isPendingExpOpen && 'text-red-500 border-b-2 border-red-500'} text-md lg:text-xl`} onClick={() => setPendingExpOpen(true)}>
            Pending Expenses
          </div>
          <div className={`${!isPendingExpOpen && 'text-green-500 border-b-2 border-green-500'} lg:text-xl`} onClick={() => setPendingExpOpen(false)}>
            Payment History
          </div>
        </div>
        <div>{
          isPendingExpOpen && pendingTasks && pendingTasks.map((task) => {
            return <Task
              date={task.date}
              amount={task.amount}
              particulars={task.particulars}
              childComponent={<div>
                <button className='bg-green-400 hover:bg-green-600 px-8 py-2 text-white rounded-lg'>Pay using Wallet</button>
              </div>} />
          })}
        </div>
        <div>
          {
            !isPendingExpOpen && completedTasks && completedTasks.map((task) => {
              return <Task
                date={task.date}
                amount={task.amount}
                particulars={task.particulars}
                childComponent={<div className={`px-2 ${task.status ? 'bg-green-200 text-green-500' : 'bg-red-200 text-red-500'} rounded-lg`}>
                  <span>{task.status ? "SUCCESS" : "FAILURE"}</span>
                </div>}
              />
            })
          }
        </div>
      </div>
    </div>
  )
}

export default WalletPage