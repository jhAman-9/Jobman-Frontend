// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState();
  const [role, setRole] = useState("");

   const { isAutherized, user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");


      const res = await fetch(
        "https://jobman-ve25.onrender.com/api/v1/user/register",
        {
          headers: myHeaders,
          method: "POST",
          body: JSON.stringify({ name, email, phone, password, role  }),
        }
      );
      console.log(res.status);
      
      
    } catch (error) {
      
    }
  }

  return (
    <div>Register</div>
  )
}

export default Register