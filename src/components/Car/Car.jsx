 import * as React from "react";
 import BasicBars from "./BasicBars";
import CarCard from "./CarCard";
import cardIcon1 from "../../assets/vectors/cardIcon/cardIcon1.svg";
import cardIcon2 from "../../assets/vectors/cardIcon/cardIcon2.svg";
import cardIcon3 from "../../assets/vectors/cardIcon/cardIcon3.svg";
import cardIcon4 from "../../assets/vectors/cardIcon/cardIcon4.svg";
import cardIcon5 from "../../assets/vectors/cardIcon/cardIcon5.svg";
import cardIcon6 from "../../assets/vectors/cardIcon/cardIcon6.svg";
import { NavLink, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";



const drawerWidth = 240;

function Car() {
  const [carData,setCarData] = useState("")
  useEffect(()=>{

    const getCars = async () => {
      try {
        const headers = await {
          token:localStorage.getItem('token')
        }
        const response = await axios.get('https://project-task-backend-a6rc.onrender.com/api/car',{ headers });
       console.log(response);
        if(response.status==200){

          console.log(response.data.cars);
           setCarData(response.data.cars)

        }
      } catch (error) {
        console.error('Error registering:', error);
        // Handle error
      }
    };
    getCars()

  },[])
  return (
    <>
      <>
    {carData? 
    
    <div className="flex gap-6 mt-6 flex-wrap lg:px-[2%]">
      
      
        
        {carData.map((item, index) => (
         <>
            
            <CarCard key={index}
          bg={`bg${(index%6)+1}`}
          brandName={`${item.name}`}
          subscriberCount={`${item.car_info.price}`}
          icon={cardIcon1}
          id={`${item._id}`}
        />
          
          </>
        ))}
      
       
      
       
      </div>: 
      <div className="flex gap-6 mt-6 flex-wrap  lg:px-[2%]">
        Please buy Car
      </div>
      }

      </> 
      <BasicBars />
    </>
  );
}

export default Car;
