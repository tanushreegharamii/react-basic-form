import { useState } from "react";
import bg from "../assets/Img/bg.jpg";
import bg_mob from "../assets/Img/bg_mob.jpg";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState();
  const [successMessage, setSuccessMessage] = useState();
  const [users, setUsers] = useState({
    username:"",
    email:"",
    password:"",
  });

  async function handleSubmit(event){
    event.preventDefault();
    try {
      if(!users.username || !users.email || !users.password){
        setErrorMessage("Fields are required! Please fill up")
        return;
      }
      let response = await fetch("http://localhost:3000/signup", {
        method : "POST",
        headers: {
          'Content-Type' : 'Application/json'
        },
        body:JSON.stringify(users)
      });
      
      if(response.status === 400){
        const errorText = await response.text();
        setErrorMessage(errorText)
      }
      else if(response.status === 201){
        setSuccessMessage("User Created Successsfully!");
        setErrorMessage('')
        setUsers( {username:"",
          email:"",
          password:"",});
          navigate("/login"); 
      }
      else{
        const genericError = await response.text()
        setErrorMessage(genericError)
        setSuccessMessage('')
      }

    } catch (error) {
      console.log(error)
    }
  }

  function handleChange (event) {
    const {name, value} = event.target;
    setUsers((prev)=> ({...prev, [name] : value}) )
  }

  return (
    <>
      <div className="relative flex justify-center items-center min-h-screen  ">
        <img src={bg} className="fixed  h-auto sm:block w-full " alt="" />
        <img src={bg_mob} className="fixed bg-cover sm:hidden" alt="" />

        <div className="absolute ">
        <h1 className=" text-2xl sm:text-3xl text-orange-800 mb-10 sm:text-white">Welcome To Analyze System</h1>
          <form onSubmit={handleSubmit} action="" className="bg-white p-5 sm:p-14 rounded-sm ">
            <p className="p-5 font-semibold sm:text-4xl text-orange-800 text-2xl ">
              Sign Up
            </p>
            {errorMessage && <p className="text-red-600">{errorMessage}</p>}
            {successMessage && <p className="text-green-500">{successMessage}</p>}
            <div className="flex justify-between gap-2 p-1 sm:p-3">
              <label className="p-1 sm:p-2" htmlFor="">
                Name
              </label>
              <input 
                onChange={handleChange}
                name="username"
                value={users.username}
                type="text"
                className="bg-orange-50 p-2 rounded-sm font-thin w-full sm:w-72"
                placeholder="Enter Your Name"
              />
            </div>
            <div className="flex gap-2 justify-between p-1 sm:p-3">
              <label className="p-1 sm:p-2" htmlFor="">
                Email
              </label>
              <input 
                onChange={handleChange}
                name="email"
                value={users.email}
                type="text"
                className="bg-orange-50 p-2 rounded-sm font-thin w-full sm:w-72"
                placeholder="Enter Valid Email"
              />
            </div>
            <div className="flex gap-2 justify-between p-1 sm:p-3">
              <label className="p-1 sm:p-2" htmlFor="">
                Password
              </label>
              <input 
                onChange={handleChange}
                name="password"
                value={users.password}
                type="text"
                className="bg-orange-50 gap-2 p-2 rounded-sm font-thin w-full sm:w-72"
                placeholder="Enter Password"
              />
            </div>
            <button className="p-2 mt-6 mb-5 rounded-sm px-5 hover:bg-orange-300 bg-orange-800 text-white ">
              Sign Up
            </button>
            <p>Already have an account? <Link to="/login"><span className="text-orange-800">Login</span></Link></p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
