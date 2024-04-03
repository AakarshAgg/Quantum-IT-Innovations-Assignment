import PropTypes from "prop-types";
import { useState } from "react";
import logo from "./assets/signup.png"
import axios from "axios";

function SignUp({ setDisplay }) {

    const [name,setName]=useState("")
    const [username,setUsername]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [dob,setDob]=useState("")
    const [inputType, setInputType] = useState('text');

    const handleFocus = () => {
      setInputType('date');
    };

    const handleBlur = () => {
      setInputType('text');
    };

    const registerUser = async (e) => {
        e.preventDefault();
        try {
            const resp = await axios.post("http://localhost:5010/api/auth/signup", 

            {name,username,email,password,dob},
            {
              headers: {
                'Content-Type': 'application/json'
              }
            }  
            )

            const data = resp.data
            //console.log(data)
            if (data.success) {
                alert("Registration Successfully.Please Log In now.")
                setDisplay(true)
            }else{
                alert(`${data.message}`)
            }
        } catch (error) {
            console.log(error)
        }
    }


  return (
    <>
    <img src={logo} width={"300px"} height={"120px"} className='mx-2' />
      <input
        type="text"
        placeholder="Name"
        className="border-2 p-2 w-80 "
        value={name}
        onChange={(e)=>setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="UserName"
        className="border-2 my-2 p-2 w-80 "
        value={username}
        onChange={(e)=>setUsername(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        className="border-2 p-2 w-80 "
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="border-2 my-2 p-2 w-80 "
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
      />
      <input
          type={inputType}
          className="border-2 p-2 w-80 "
          value={dob}
          onFocus={handleFocus}
      onBlur={handleBlur}
          onChange={(e)=>setDob(e.target.value)}
          max={new Date().toISOString().split('T')[0]} // Set max date to today's date
          placeholder="Date of Birth"
        />
      <br/>
      <button
        className="bg-sky-500 text-white p-1 w-80 font-bold my-2"
        type="submit"
        onClick={ registerUser}
      >
        Sign Up
      </button>
      <div className="flex py-2 justify-center">
        <p>Have an account?</p>
        <p
          className="text-blue-600 cursor-pointer px-2"
          onClick={() => setDisplay(true)}
        >
          Log In
        </p>
      </div>
    </>
  );
}

SignUp.propTypes = {
  setDisplay: PropTypes.func.isRequired,
};

export default SignUp;
