"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Loginpage(){

    const router  = useRouter()

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const [buttonDisabled, setbuttonDisabled] = useState(true)

    const [loading, setLoading] = useState(false)


    const onLogin = async ()=>{
        try {
            setLoading(true)
            const response =  await axios.post("/api/users/login", user)

            console.log("Login success", response.data);

            router.push('/profile')

        } 
        catch ( error:any) {
         console.log("Login Failed")  
         console.log(error.message) 
         toast.error(error.message)
        }
    }


    useEffect(() =>{
        if(user.email.length > 0  &&  user.password.length > 0){
            setbuttonDisabled(false)
        }
        else{
            setbuttonDisabled(true)
        }
    }, [user])


    return (
       <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <h1>{loading ? "Processing": "Login"}</h1>

        <hr />

        <label htmlFor="email">Email</label>
        <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black" type="text" name="" id="email" 
        value={user.email} onChange={(e) =>setUser({...user,email:e.target.value})}
        placeholder="Email" />

        <label htmlFor="email">Password</label>
        <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black" type="text" name="" id="password" 
        value={user.password} onChange={(e) =>setUser({...user,password:e.target.value})}
        placeholder="password" />

        <button className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" onClick={onLogin}>{buttonDisabled ? "Please Enter Credintials" : "Login"}</button>
        <Link href="/signup">Signup Page</Link>

       </div>
    )
}

