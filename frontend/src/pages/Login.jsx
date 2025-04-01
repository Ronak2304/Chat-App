import { useState } from "react";
import { useAuthStore } from "../store/store";
import Navbar from "../components/Navbar";

const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setpassword] = useState("")
  const [show, setShow] = useState(false)
  
  const {isLoggingIn,login} = useAuthStore()

  function validateForm(){
    if(email.trim()==="" || password.trim()===""){
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
      login({
        email:email,
        password:password
      })
      setEmail("")
      setpassword("")
    }
  }

  return (
    <div>
      <Navbar />
      <form onSubmit={handleSubmit}>
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
        <button type="submit" disabled={isLoggingIn}>
          {isLoggingIn?"Submitting":"Submit"}
        </button>
      </form>
    </div>
  );
};

export default Login;
