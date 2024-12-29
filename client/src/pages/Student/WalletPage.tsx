import { Wallet, IndianRupee, Plus } from 'lucide-react'
import Navbar from './Navbar'
import React, { useState } from 'react'

function WalletPage():React.ReactElement {
    const [isPendingExpOpen,setPendingExpOpen] = useState<boolean>(false)
  return (
    <div>
        <Navbar/>
        <div className='p-4'>
            {/* Heading */}
            <div className='my-3 text-3xl font-semibold mb-6'>
                <span>
                    Your Wallet
                </span>
            </div>

            {/* Wallet Balance Container */}
            <div className='min-w-screen shadow-lg flex flex-col lg:flex-row justify-between gap-5 bg-blue-100 p-5'>
                <div className='flex flex-col lg:flex-row text-3xl gap-2 items-center'>
                <Wallet size={56} className='text-blue-900'/>
                    <span className='text-gray-600'>Current Balance: </span>
                    <span className='flex items-center font-semibold'>
                        <IndianRupee size={24}/>
                        <span>30,000</span>
                    </span>
                </div>

                {/* Add Funds Button */}
                <div className='flex justify-center lg:justify-end px-3'>
                    <button className='bg-blue-500 text-white px-2 py-3 rounded-lg hover:bg-blue-700'>
                        <span className='flex items-center gap-1'>
                            <Plus size={20}/><span>Add Funds</span>
                        </span>
                    </button>
                </div>  
            </div>
            <div className='py-5 flex justify-evenly px-2 text-xl font-semibold'>
                <div className='text-red-500 border-b-2 border-red-500'>
                    Pending Expenses
                </div>
                <div className=''>
                    Payment History
                </div>
            </div>
            <div className='overflow-x-auto'>
              <div className='flex flex-col md:flex-row lg:flex-row justify-between'>
              <div>
                <span className='md:hidden lg:hidden'>Date: </span>
                23/12/24
              </div>
              <div>
                <span className='md:hidden lg:hidden'>Amount: </span>
                500
              </div>
              <div className='w-1/3 break-all'>
                journakkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
              </div>
              <div>
                <button className='bg-green-400 px-8 py-2 text-white rounded-lg'>Pay</button>
              </div>
              </div>
            </div>
        </div>
    </div>
  )
}

export default WalletPage