import  { useRef, useState } from 'react';
import { BrowserRouter, NavLink, Route, Routes,useNavigate } from 'react-router-dom';
import { Formik, Form,  } from 'formik';
import Mybutton from '../components/MyComponents/Mybutton';
import LoginSchema from '../components/YupSchema/LoginSchema';
import MyField from '../components/MyComponents/MyField';
import lock from '../assets/image/FramelockPng.png'
import googleLog from '../assets/vectors/Group 1171277609googlebtn.png'
import Header from '../components/Header';
import axios from 'axios';


const LoginForm = () => {
  const navigate = useNavigate()
  const dashboardButton = useRef('');
  const [passwordType, setPasswordType] = useState('password')
  const handleSubmit = async (values) => {
    try {
      const requestData = {
        user_email: values.email,
        password: values.password,
      };
  
      const response = await axios.post('https://project-task-backend-a6rc.onrender.com/api/auth/login', requestData);
  
      if(response.status==200){
        console.log(response.data);
        const token =await response.data.user.token
        localStorage.setItem('token', token);

        navigate("/profile/dashboard")
      }
    } catch (error) {
      console.error('Error registering:', error);
      // Handle error
    }
  };

 
  return (
    
            <div className="w-full bg-white    rounded-lg ">
              <h1 className="  mb-6 " style={{fontSize:'35px',fontWeight:'500', textShadow: '1px 2px 2px rgba(0, 0, 0, .4)'}} >Welcome Back</h1>
              <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={
                  LoginSchema}
                onSubmit= {(values)=>handleSubmit(values)}
              >
                {({ errors, touched }) => (
                  <Form className="">
                    <div className='flex flex-col gap-5' >
                      <div > 
                         <MyField errors={errors.email} name={'email'} touched={touched.email} text={'Email'} placeholderText={'Enter you email address'} labelName={'Email'} />
                      </div>
            
                      <div className='  '>
                <div className='w-[100%] '>
                  <MyField errors={errors.password} name={'password'} touched={touched.password} text={'Password'} placeholderText={'Password'} type={passwordType} labelName={'Password'} />
                </div>
                {passwordType==='text'?<i className="fa-regular fa-eye relative top-[-50px] left-[90%]" onClick={()=>(setPasswordType('password'))}></i>:<i className="fa-regular fa-eye-slash relative top-[-50px] left-[90%]"  onClick={()=>(setPasswordType('text'))}></i>}
                
                
                      </div>
                    </div>
                    <div className='flex justify-end mb-10' ><NavLink to='/forgot' className='underline'>Forgot Password?</NavLink></div>
                    <Mybutton text={'Login'} />

                    <div className='mt-4' style={{ textAlign: 'center', position: 'relative' }}>
                      <hr style={{ position: 'absolute', bottom: '50%', width: '100%', margin: '0', height: '2px', backgroundColor: 'black' }} />
                      <span style={{ backgroundColor: 'white', padding: '0 10px', position: 'relative', zIndex: '1' }}>or login with</span>
                    </div>

                    <div className='flex justify-center mt-7'> <img src={googleLog} alt="" /> </div>

                    <div className='flex justify-center gap-8 text-blue-800 mt-6 '>
                      <NavLink to={'/signup'} className=' font-bold' style={{ color: '#FAA43C' }}>Sign Up</NavLink>
                      <NavLink to={'/profile/dashboard'} className=' font-bold' style={{ display: 'none' }} ref={dashboardButton}></NavLink>
                    </div>

           


                  </Form>
                )}
              </Formik>
            </div>
          
  )
};

export default LoginForm;
