import { useState } from "react";
import bg from "../assets/Img/bg.jpg";
import bg_mob from "../assets/Img/bg_mob.jpg";
import {Link, useNavigate} from 'react-router-dom'

const Login = () => {
  const [errorMessage, setErrorMessage] = useState();
  const [successMessage, setSuccessMessage] = useState();

  const navigate = useNavigate();

  const [users, setUsers] = useState({
    email : "",
    password: "",
  });
  function handleChange (e){
    const {name, value} = e.target;
    setUsers((prev)=>({...prev,[name] : value }))
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if(!users.email || !users.password){
        setErrorMessage("Fields are required!")
        setSuccessMessage('')
      }
      let response = await fetch("http://localhost:3000/login", {
        method:"POST",
        headers:{
          'Content-Type' : 'Application/json',
        },
        body : JSON.stringify(users)
      });

      if(response.status === 400){
        const err = await response.text()
        setErrorMessage('Invalid credentials ', err)
        console.log(errorMessage, err)
        setSuccessMessage('')
        setUsers( {username:"",
          email:"",
          password:"",});
      }
      else if(response.status === 201){
        setSuccessMessage("User Log In Successful")
        setErrorMessage('')
        setUsers( {username:"",
          email:"",
          password:"",});
          navigate("/welcome")
      }

    } catch (error) {
      console.log(error)
      setSuccessMessage('')
      setUsers( {username:"",
        email:"",
        password:"",});
    }
  }
  return (
    <>
      <div className="relative flex justify-center items-center min-h-screen  ">
        <img src={bg} className="fixed bg-cover sm:block w-full " alt="" />
        <img src={bg_mob} className="fixed bg-cover sm:hidden" alt="" />

        <div className="absolute ">
        <h1 className=" text-2xl sm:text-3xl text-white mb-5 sm:mb-10">Welcome To Analyze System</h1>
          <form onSubmit={handleSubmit} action="" className="bg-white p-5 sm:p-14 rounded-sm ">
            <p className="p-5 font-semibold sm:text-4xl text-orange-800 text-2xl ">
              Login
            </p>
            {errorMessage && <p className="text-red-600">{errorMessage}</p>}
            {successMessage && <p className="text-green-500">{successMessage}</p>}
            <div className="flex justify-between p-1 sm:p-3">
              <label className="p-2" htmlFor="">
                Email
              </label>
              <input
                value={users.email}
                name="email"
                onChange={handleChange}
                type="text"
                className="bg-orange-50 p-2 rounded-sm font-thin w-full sm:w-72"
                placeholder="Enter Valid Email"
              />
            </div>
            <div className="flex justify-between p-1 sm:p-3">
              <label className="p-2" htmlFor="">
                Password
              </label>
              <input
                value={users.password}
                name="password"
                onChange={handleChange}
                type="text"
                className="bg-orange-50 p-2 rounded-sm font-thin w-full sm:w-72"
                placeholder="Enter Password"
              />
            </div>
            <button className="p-2 mt-6 mb-5 rounded-sm px-5 bg-orange-800 text-white ">
            Login
            </button>
            <p>Do not have an account? <Link to="/signup" ><span className="text-orange-800">Sign Up</span></Link> </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
