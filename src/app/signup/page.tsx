"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function page(){

    const router  = useRouter()

    const [user, setUser] = useState({
        email: "",
        password: "",
        username: ""
    })

    const [buttonDisabled, setbuttonDisabled] = useState(true)

    const [loading, setLoading] = useState(false)


    const onSignup = async ()=>{
        try {
            setLoading(true)
            const response =  await axios.post("/api/users/signup", user)

            console.log("signup success", response.data);

            router.push('/login')

        } 
        catch ( error:any) {
         console.log("Signup Failed")   
         toast.error(error.message)
        }
    }


    useEffect(() =>{
        if(user.email.length > 0  &&  user.password.length > 0 && user.username.length > 0){
            setbuttonDisabled(false)
        }
        else{
            setbuttonDisabled(true)
        }
    }, [user])


    return (
       <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <h1>{loading ? "Processing": "Signup"}</h1>
        <hr />

        <label htmlFor="username">Username</label>
        <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black" type="text" name="" id="username" 
        value={user.username} onChange={(e) =>setUser({...user,username:e.target.value})}
        placeholder="Username" />

        <label htmlFor="email">Email</label>
        <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black" type="text" name="" id="email" 
        value={user.email} onChange={(e) =>setUser({...user,email:e.target.value})}
        placeholder="Email" />

        <label htmlFor="email">Password</label>
        <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black" type="text" name="" id="password" 
        value={user.password} onChange={(e) =>setUser({...user,password:e.target.value})}
        placeholder="password" />

        <button className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" onClick={onSignup}>{buttonDisabled ? "Please fill form" : "Signup"}</button>
        <Link href="/login">Visit Login Page</Link>

       </div>
    )
}

