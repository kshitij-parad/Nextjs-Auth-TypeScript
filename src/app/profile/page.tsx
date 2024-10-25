'use client'
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";


export default function Profilepage() {

    const router = useRouter()
    const [data, setData] = useState<any>(null);
    // const [data, setData] = useState("nothing")

    const getUserDetails = async () => {

        try {
            const response = await axios.post("/api/users/me")
            console.log(response)


            setData(response.data.data)

            // setData(response.data.data._id)

        } catch (error: any) {
            console.log(error.message)
            toast.error(error.message)
        }


    }

    const logout = async () => {
        try {
            await axios.get('/api/users/logout')
            toast.success("logout Sucess")
            router.push("/login")

        } catch (error: any) {
            console.log(error.message)
            toast.error(error.message)
        }
    }

    

    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <h1>Profile Page</h1>
        <hr />
        <h2>{data === "nothing" ? "nothing" : <Link href={`/profile/${data}`}>{data.id}</Link>}</h2>
        <div className="pfp bg-slate-400 rounded-lg w-80 h-auto">
                <h1 className="text-black">{data ? data : "Loading..."}</h1>
            </div>
        <hr />
        <button className="bg-blue-200 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={logout}>Logout</button>
        <button className="bg-green-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={getUserDetails}>Get User</button>
        </div>

    )
}

