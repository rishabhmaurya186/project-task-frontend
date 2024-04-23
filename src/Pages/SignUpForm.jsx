
import { useEffect, useRef, useState } from "react";

import { Formik, Form, Field, ErrorMessage } from "formik";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import { MenuItem, Select, TextField } from "@mui/material";
import { NavLink,useNavigate } from "react-router-dom";
import Mybutton from "../components/MyComponents/Mybutton";
import "react-image-crop/dist/ReactCrop.css";
import axios from "axios";

import * as Yup from 'yup';
const SignUpSchema = Yup.object().shape({
  firstName: Yup.string().min(2, 'First name should be at least 2 characters long.').max(60, 'First name should be less than 60 characters').required('Please enter your first name.'),
  lastName: Yup.string().max(60, 'Last name should be less than 60 characters').required('Please enter your last name.'),
  email: Yup.string().email('Please enter a valid email.').required('Please enter your email.'),
  mobileNumber: Yup.string().min(10, 'Please enter valid mobile number').required('Please enter mobile number.'),
  password: Yup.string().min(6, 'Password must be at least 6 characters long.').max(30, 'Password should be less than 30 characters').required('Please enter your password.'),
  user_location: Yup.string().required('Please enter your location.')
  
});
const SignUpForm = () => {
  const dashboardButton = useRef("");
 
  const [carData , setCarData]= useState(null)
  
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    password: "",
    user_location: "",
  
  };

  const handleKeyPress = (e) => {
    if (e.target.value.length >= 60 || e.key === " ") {
      e.preventDefault();
    }
  };
  const handleKeyPressLast = (e) => {
    if (e.target.value.length >= 60) {
      e.preventDefault();
    }
    if (e.target.value === "") {
      if (e.key === " ") {
        e.preventDefault();
      }
    }
  };

const navigate = useNavigate()
const handleSubmit = async (values) => {
  try {
    const requestData = {
      user_email: values.email,
      user_location: values.user_location,
      password: values.password,
      vehicle_info: values.Car,
      user_info: {
        firstName: values.firstName,
        lastName: values.lastName,
        mobileNumber: values.mobileNumber,
      },
    };

    const headers = {
      token:localStorage.getItem('token')
    }
    const response = await axios.post('https://project-task-backend-a6rc.onrender.com/api/auth/register', requestData,{ headers });

    if(response.status==200){
      console.log(response);
      navigate("/profile/dashboard")
    }
  } catch (error) {
    console.error('Error registering:', error);
    // Handle error
  }
};


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://project-task-backend-a6rc.onrender.com/api/car");
        setCarData(response.data)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="  w-[100%] bg-white  rounded-lg ">
      <div className="text-center font-medium text-xl mb-6">Sign Up</div>
      <Formik
        initialValues={initialValues}
        validationSchema={SignUpSchema}
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
                  name="firstName"
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  onKeyPress={handleKeyPress}
                />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="ErrorMessge"
                />
              </div>
              <div className="w-[50%]">
                <Field
                  as={TextField}
                  name="lastName"
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  onKeyPress={handleKeyPressLast}
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="ErrorMessge"
                />
              </div>
            </div>

            <div className="mb-3">
              <Field
                name="email"
                as={TextField}
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="ErrorMessge"
              />
            </div>

            <div className="mb-2">
              <Field
                name="mobileNumber"
                render={({ field }) => (
                  <PhoneInput
                    {...field}
                    country={"in"}
                    inputClass="form-control"
                    containerClass="phone-input-container"
                    onChange={function n(value) {
                      setFieldValue("mobileNumber", value);
                    }}
                    inputProps={{
                      name: "mobileNumber",
                      required: true,
                      placeholder: "Mobile Number",
                      style: {
                        width: "100%",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        paddingLeft: "48px",
                        height: "53px",
                      },
                    }}
                  />
                )}
              />
              <ErrorMessage
                name="mobileNumber"
                component="div"
                className="ErrorMessge"
              />
            </div>

            <div>
              <Field
                name="password"
                as={TextField}
                label="Password"
                variant="outlined"
                fullWidth
                margin="normal"
                type="password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="ErrorMessge"
              />
            </div>

            <div>
              <Field
                name="user_location"
                as={TextField}
                label="User location"
                variant="outlined"
                fullWidth
                margin="normal"
                type="password"
              />
              <ErrorMessage
                name="user_location"
                component="div"
                className="ErrorMessge"
              />
            </div>
            <div className='w-[100%]'>
               
                <Field
                  name="Car"
                  as={Select}
                  variant="outlined"
                  className='w-[100%] '
                  onKeyPress={handleKeyPress}
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

            <Mybutton text={"Sign Up"} />
            <div className="mt-6 text-center ">
              {" "}
              Already have an account?
              <NavLink
                to={"/login"}
                className=" font-bold"
                style={{ color: "#FAA43C" }}
              >
                {" "}
                Login
              </NavLink>
              <NavLink
                to={"/profile/dashboard"}
                className=" font-bold"
                style={{ display: "none" }}
                ref={dashboardButton}
              ></NavLink>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUpForm;
