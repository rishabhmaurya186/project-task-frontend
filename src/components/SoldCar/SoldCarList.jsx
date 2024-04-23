import React from 'react'
import DivisionHeader from '../MyComponents/DivisionHeader'


function SoldCarList() {
  return (
    <div className='mx-10'>
      <DivisionHeader text={'Sold Cars'} />

      <div className='rounded-t-lg bg-white px-10' >

<div className="flex justify-between  py-5 border-b-[1px] border-gray-300">
  <div className='flex gap-10'>
  <div style={{ position: 'relative', display: 'inline-block' }} >
    <input
        type="text"
        placeholder="Search by car name"
        style={{
            padding: '8px 50px 8px 10px',
            borderRadius: '4px',
            border: '1px solid #ccc',
          width: '400px',
            height:'50px',
            boxSizing: 'border-box',
            fontSize: '16px',
        }}
    />
    <i className="fa-solid fa-magnifying-glass" style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: 'gray' }}></i>

    
</div>
<div className='border-gray-200 border-solid border-2  flex rounded-lg items-center px-3'>
    
      <select className='outline-none px-5' id='sort'>
      <option value='none' className=' border-none'  >Sort by</option>
      <option value="name" className=' border-none  '>Name</option>
      <option value="price" className=' border-none  '>Price</option>
      </select>
      </div>
      </div>




</div>



</div>
      
    </div>
  )
}

export default SoldCarList
