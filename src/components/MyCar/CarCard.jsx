import { useNavigate } from 'react-router-dom';
import '../Car/car.css'
import axios from 'axios';
const CarCard = ({  brandName, subscriberCount,bg,icon ,id}) => {
    let ide = id
    const navigate = useNavigate()
  const handleDelete = async (id)=>{
    try {
        
        const headers = await {
          token:localStorage.getItem('token')
        }
        
        const response = await axios.delete(`https://project-task-backend-a6rc.onrender.com/api/car/${ide}`,{ headers });
       console.log(response);
        if(response.status==200){

          
          navigate("/profile/dashboard")
           

        }
      } catch (error) {
        console.error('Error registering:', error);
        // Handle error
      }
  }

    return (
        <div className="w-[90%]  md:w-[31%]   mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          
            <div className= { `flex items-center justify-between p-4  text-white h-[150px] ${bg}`} >
                <div className="flex items-center">
                  <div className='mt-3'><img src={ icon} /></div>  
                
                    <div className='flex flex-col  justify-start ' style={{color:'black'}} >
                        <p className="  ml-7 text-[20px] font-thin   " style={{fontWeight:'300'}}>{brandName}</p>
                        <h1 className="text-3xl font-semibold ml-7 mt-4" style={{fontWeight:'300'}}>{ subscriberCount }</h1>
                    </div>
                    
                </div>
                {/* <div className='flex flex-col gap-5 text-xl'>
                <i className="fa-regular fa-pen-to-square text-black"></i>
                <i className="fa-solid fa-trash text-black" onClick={()=>handleDelete()}></i>
                </div> */}
                
            </div> 
        </div>
    );
};

export default CarCard;
