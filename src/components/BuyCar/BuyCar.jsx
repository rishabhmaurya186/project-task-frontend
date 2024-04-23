import React,{useEffect,useState} from 'react'
import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { MenuItem, Select } from '@mui/material';
import { Outlet,useNavigate } from 'react-router-dom';
import DivisionHeader from '../MyComponents/DivisionHeader';
import Mybutton from '../MyComponents/Mybutton';



function BuyCar() {
    
   const navigate = useNavigate()
    const [selectedCar,setSelectedCar]= useState("")
    const [selectedDealership,setSelectedDealership]= useState("")
    const [carData,setCarData]=useState(null)

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get("https://project-task-backend-a6rc.onrender.com/api/car");
            setCarData(response.data)
            //console.log(response.data.cars);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
      }, []);
      const [selectedData,setSelectedData]= useState(null)

     const [dealershipData,setDealershipData]=useState(null)
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get("https://project-task-backend-a6rc.onrender.com/api/dealership");
          setDealershipData(response.data)
         
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchData();
    }, [])
  const [CarDatas,setCarDatas] = useState(null)
  const [CarDataId,setCarDataId] = useState(null)
  useEffect( ()=>{

      const fetchData = async () => {
        if(!CarDataId){
          return
        }
          try {
            
            const response = await axios.get(`https://project-task-backend-a6rc.onrender.com/api/car/${CarDataId}`);
            setCarDatas(response.data.carData)
            console.log(response.data);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
        fetchData()

  },[CarDataId])
  useEffect(()=>{
     console.log(CarDatas);
  },[CarDatas])
  const handleSubmit = async (values) => {
    try {
      const requestData = {
        vehicle: values.Car,
      };
      
      const headers = await {
        token:localStorage.getItem('token')
      }
      const response = await axios.put('https://project-task-backend-a6rc.onrender.com/api/auth', requestData,{ headers });
     console.log(response);
      if(response.status==200){
        console.log(response);
        navigate("/profile/mycar")
      }else{
        navigate('/')
      }
    } catch (error) {
      console.error('Error registering:', error);
      // Handle error
    }
  };

  return (
    
        <div className='mx-10'>
      <DivisionHeader text={'Buy Car'} />
      <div className='mt-6'>
        <Formik
        initialValues={{Car:"",dealership:""}}
        onSubmit={(values)=>{
            handleSubmit(values)
        }}
        >  {({ setFieldValue }) => (
            <Form>
              <div className='flex justify-between'>

              
            <div className='w-[48%]'>
            <label>Select Dealership</label>
               <Field
                 name="Car"
                 as={Select}
                 variant="outlined"
                 className='w-[100%] '
                 defaultValue="" 
                 displayEmpty 
                  onChange={(e) => {
        setFieldValue("Car", e.target.value);
        // alert(e.target.value)
        
        setCarDataId(e.target.value);
    }}
               >
                 <MenuItem value="" disabled >Select Car</MenuItem> 
                 
                 {carData?.cars?.map(option => (
                   <MenuItem key={option._id} value={option._id}>
                     {option.name}
                   </MenuItem>
                  
                 ))}
                 
                 
               </Field>
               <ErrorMessage name="division" component="div" className="text-red-600" />
             </div> 
             <div className='w-[48%]'>
               <label>Select Dealership</label>
               <Field
                 name="dealership"
                 as={Select}
                 variant="outlined"
                 className='w-[100%] '
                 defaultValue="" 
                 displayEmpty 
                  onChange={(e) => {
        setFieldValue("dealership", e.target.value);
        setSelectedDealership(e.target.value);
    }}
               >
                 <MenuItem value="" disabled >Select Dealership</MenuItem> 
                 
                 {dealershipData?.dealerships?.map(option => (
                   <MenuItem key={option._id} value={option._id}>
                     {option.dealership_name}
                   </MenuItem>
                  
                 ))}
                 
                 
               </Field>
               <ErrorMessage name="division" component="div" className="text-red-600" />
             </div> 
             </div>
             {selectedCar ? null  : "Please select a car"}
             <> 
   {CarDatas && <div className='mt-20 ml-20 text-3xl'>
      <div className='mt-3'>
        <h1>Name:  {CarDatas?.name}</h1>
      </div>
      <div className='mt-3'>
        <h1>Model: {CarDatas?.model}</h1>
      </div>
      <div className='mt-3'>
        <h1>Colour: {CarDatas?.car_info?.color}</h1>
      </div>
      <div className='mt-3'>
        <h1>Price: ${CarDatas?.car_info?.price}</h1>
      </div>
      <div className='w-[50%] mt-10'>

      <Mybutton text={"Pay"} />
      </div>
       
    </div>}

    </>
             
            </Form>)}
        </Formik>
        </div>
            {/* <Formik
        initialValues={initialValues}
       // validationSchema={SignUpSchema}
        onSubmit={(values) => {
          //handleSubmit(values)
        }}
      >
        {({ setFieldValue }) => (
          <Form className=" " action="£">
                <div className='w-[100%]'>
               
               <Field
                 name="Car"
                 as={Select}
                 variant="outlined"
                 className='w-[100%] '
                 defaultValue="" 
                 displayEmpty 
               >
                 <MenuItem value="" disabled >Select Car</MenuItem> 
                 
                 {carData?.cars?.map(option => (
                   <MenuItem key={option._id} value={option._id}>
                     {option.name}
                   </MenuItem>
                  
                 ))}
                 
                 
               </Field>
               <ErrorMessage name="division" component="div" className="text-red-600" />
             </div> 
             </Form>
            )}
          </Formik> */}
    </div>
  )
}

export default BuyCar
