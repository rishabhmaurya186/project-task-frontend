import { MenuItem, Select, TextField } from '@mui/material';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react'
import * as Yup from 'yup';
import DivisionHeader from '../MyComponents/DivisionHeader';
import SingleBtn from '../MyComponents/SingleBtn';
import Mybutton from '../MyComponents/Mybutton';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Schema = Yup.object().shape({
  type: Yup.string().required('Please car type.'),
  name: Yup.string().required('Please enter car name.'),
  model: Yup.string().required('Please enter car model.'),
  color: Yup.string().required('Please enter car model.'),
  fuel_type: Yup.string().required('Please enter car model.'),
  price: Yup.string().required('Please enter car model.'),
  
  
});
const initialValues = {
  type: "",
  name: "",
  model: "",
  color: "",
  fuel_type: "",
  price: "",

};


function AddCar() {
  const navigate = useNavigate()
  const handleSubmit = async (values) => {
     try {
      const requestData = {
        type: values.type,
        name: values.name,
        model: values.model,
        car_info:{
          color:  values.color,
          fuel_type:  values.fuel_type,
          price: values.price
        }
      };
  
      const headers = {
        token:await localStorage.getItem('token')
      }
     
      const response = await axios.post('https://project-task-backend-a6rc.onrender.com/api/car/add', requestData,{ headers });
  
      if(response.status==200){
        console.log(response);
        navigate("/profile/dashboard")
      }
    } catch (error) {
      console.error('Error registering:', error);
      // Handle error
    }
  };
  return (
    <div className='mx-10'>
      <DivisionHeader text={'Add Car'} />
      <Formik
        initialValues={initialValues}
        validationSchema={Schema}
        onSubmit={(values) => {
          handleSubmit(values)
        }}
      >
        {({ setFieldValue }) => (
          <Form className=" " action="£">
            <div className="flex gap-8 ">
              <div className="w-[50%]">
                <Field
                  as={TextField}
                  name="name"
                  label="Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="ErrorMessge"
                />
              </div>
              <div className="w-[50%]">
                <Field
                  as={TextField}
                  name="model"
                  label="Model"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  // onKeyPress={handleKeyPressLast}
                />
                <ErrorMessage
                  name="model"
                  component="div"
                  className="ErrorMessge"
                />
              </div>
            </div>
            <div className="flex gap-8 ">
              <div className="w-[50%]">
                <Field
                  as={TextField}
                  name="type"
                  label="Type"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  // onKeyPress={handleKeyPress}
                />
                <ErrorMessage
                  name="type"
                  component="div"
                  className="ErrorMessge"
                />
              </div>
              <div className="w-[50%]">
                <Field
                  as={TextField}
                  name="color"
                  label="Color"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  // onKeyPress={handleKeyPressLast}
                />
                <ErrorMessage
                  name="color"
                  component="div"
                  className="ErrorMessge"
                />
              </div>
            </div>
            <div className="flex gap-8 ">
              <div className="w-[50%]">
                <Field
                  as={TextField}
                  name="price"
                  label="Price"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  // onKeyPress={handleKeyPress}
                />
                <ErrorMessage
                  name="price"
                  component="div"
                  className="ErrorMessge"
                />
              </div>
              <div className="w-[50%] mt-4">
                
              <Field
                  name="fuel_type"
                  as={Select}
                  variant="outlined"
                  className='w-[100%] '
                  // onKeyPress={handleKeyPress}
                  defaultValue="" 
                  displayEmpty 
                >
                  <MenuItem value="" disabled  >Select Fuel Type</MenuItem> 
                  <MenuItem value="petrol"   >petrol</MenuItem>
                  <MenuItem value="electric"   >electric</MenuItem>
                  <MenuItem value="diesel"   >diesel</MenuItem>
                </Field>
                <ErrorMessage
                  name="fuel_type"
                  component="div"
                  className="ErrorMessge"
                />
              </div>
            </div>
            <div className='w-[50%]'>
            <Mybutton text={"Add"} />
            </div>
            
          </Form>)}
          </Formik>
    </div>
  )
}

export default AddCar
