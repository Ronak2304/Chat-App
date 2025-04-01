import { useState } from "react";
import { useAuthStore } from "../store/store";
import Navbar from "../components/Navbar";

const Signup = () => {

  const [fullName, setfullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setpassword] = useState("")
  const [show, setShow] = useState(false)
  
  const {isSigningUp,signup} = useAuthStore()

  function validateForm(){
    if(fullName.trim()==="" || email.trim()==="" || password.trim()===""){
      console.log("All fields are required")
      return false;
    }
    if(password.trim().length<6){
      console.log("Password must be min of 6 chars")
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      console.log("Invalid email format");
      return false;
    }
    return true
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if(validateForm()){
      signup({
        fullName:fullName,
        email:email,
        password:password
      })
      setfullName("")
      setEmail("")
      setpassword("")
    }
  }

  return (
    <div className="">
      <Navbar />
      <form onSubmit={handleSubmit}>
        <div>
          <p>
            Enter Fullname
          </p>
          <input type="text" value={fullName} onChange={(e)=>setfullName(e.target.value)}/>
        </div>
        
        <div>
          <p>
            Enter Email
          </p>
          <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        </div>

        <div>
          <p>
            Enter Password
          </p>
          <input type={show?"text":"password"} value={password} onChange={(e)=>setpassword(e.target.value)}/>
          <p onClick={()=>setShow(!show)}>
            toggle
          </p>
        </div>
        <button type="submit" disabled={isSigningUp}>
          {isSigningUp?"Submitting":"Submit"}
        </button>
      </form>
    </div>
  );
};

export default Signup;
